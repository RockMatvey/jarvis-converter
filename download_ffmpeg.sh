#!/bin/bash
mkdir -p ffmpeg-master-latest-win64-gpl/bin/

# Замените URL на прямые ссылки из облачного хранилища
curl -L -o ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe "https://drive.google.com/file/d/1Dll-NUNuLiF-T24pT9vAt8IOxl0IrZ_E/view?usp=drive_link"
curl -L -o ffmpeg-master-latest-win64-gpl/bin/ffprobe.exe "https://drive.google.com/file/d/1jcEjEebIpFqERkOhvFYLrqxx_j7fa4U-/view?usp=drive_link"
curl -L -o ffmpeg-master-latest-win64-gpl/bin/ffplay.exe "https://drive.google.com/file/d/1FQqMShBh1jtylIwZE7bNBFlvu_xO4Udm/view?usp=drive_link"
