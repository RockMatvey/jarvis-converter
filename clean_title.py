import re

def clean_title(title):
    # Удаление ненужных фраз и текста в скобках
    title = re.sub(r'\s*\(.*?\)', '', title)  # Удалить текст в круглых скобках
    title = re.sub(r'\s*\[.*?\]', '', title)  # Удалить текст в квадратных скобках
    title = re.sub(r'\s*\{.*?\}', '', title)  # Удалить текст в фигурных скобках
    title = re.sub(r'(?i)\bofficial music video\b|\blive concert\b|\bvideo\b|\bfull hd\b|\brehearsal\b|\bperformance\b|\brecorded\b|\bversion\b|\bofficial\b|\blive\b|\bremastered\b', '', title)  # Удалить определенные слова
    title = re.sub(r'\b\d{4}\b', '', title)  # Удалить года (четырехзначные числа)
    title = re.sub(r'\s+', ' ', title).strip()  # Удалить лишние пробелы
    return title

def extract_info(title):
    # Разделение названия на название песни и исполнителя
    # Поддержка различных разделителей
    parts = re.split(r'[-:|&]', title)
    parts = [part.strip() for part in parts if part.strip()]  # Удаляем пустые строки

    if len(parts) >= 2:
        artist = parts[0]
        song = ' - '.join(parts[1:]).strip()  # Объединяем все остальные части как название
    elif len(parts) == 1:
        artist = "Unknown Artist"
        song = parts[0].strip()
    else:
        artist = "Unknown Artist"
        song = title.strip()
    
    return song, artist

# Пример использования
if __name__ == "__main__":
    titles = [
        "Deep Purple - Child In Time - Live (1970)",
        "Led Zeppelin - Stairway To Heaven (Live at Earls Court 1975) [Official Video]",
        "Metallica - Nothing Else Matters 2007 Live Video Full HD",
        "Metallica: The Unforgiven (Madrid, Spain - July 14, 2024)",
        "Guns N' Roses - November Rain (2022 Version)",
        "Metallica: One (Official Music Video)",
        "Deep Purple - Smoke On The Water (Live from Montreux 2007)",
        "Metallica: Master of Puppets (Manchester, England - June 18, 2019)",
        "Master of Puppets (Remastered)"
    ]

    for title in titles:
        cleaned = clean_title(title)
        song, artist = extract_info(cleaned)
        print(f"Original: {title}\nCleaned: {cleaned}\nSong: {song}\nArtist: {artist}\n")
