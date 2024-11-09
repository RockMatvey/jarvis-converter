const express = require('express');
const bodyParser = require('body-parser');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Используем переменную окружения для порта или 3000 по умолчанию
const port = process.env.PORT || 3000;

// Папка для сохранения загруженных файлов на локальном диске C
const downloadsDir = 'C:\\youtube-converter\\downloads';

// Создаем папку, если она не существует
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}

// Настройка middleware для обработки JSON и CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Отдача главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Получение информации о видео
app.get('/get-video-info', (req, res) => {
    const videoUrl = req.query.url;

    youtubedl(videoUrl, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true
    }).then(output => {
        const videoInfo = {
            title: output.title,
            thumbnailUrl: output.thumbnail,
        };
        res.json(videoInfo);
    }).catch(err => {
        console.error('Ошибка при получении информации о видео:', err);
        res.json({ error: 'Не удалось получить информацию о видео' });
    });
});

// Обработчик для скачивания MP3 и MP4
app.get('/download', (req, res) => {
    const url = req.query.url;
    const format = req.query.format; // Получаем формат из запроса (mp3 или mp4)
    const title = req.query.title;

    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const outputFileName = format === 'mp3' ? `${safeTitle}.mp3` : `${safeTitle}.mp4`; // Имя файла для окончательной версии
    const outputFilePath = path.join(downloadsDir, outputFileName);

    const options = {
        output: outputFilePath,
        format: format === 'mp3' ? 'bestaudio[ext=m4a]' : 'best', // Заменяем на 'best' для mp4
    };

    console.log('Запрос на скачивание:', url, 'Формат:', format);

    youtubedl(url, options)
        .then(() => {
            console.log('Файл скачан:', outputFilePath);
            
            // После успешной загрузки сразу же отправляем файл
            res.download(outputFilePath, (err) => {
                if (err) {
                    console.error('Ошибка при отправке файла:', err);
                    return res.status(500).send('Ошибка при отправке файла');
                }
            });
        })
        .catch(err => {
            console.error('Ошибка при скачивании видео:', err);
            return res.status(500).send('Ошибка при скачивании видео');
        });
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
