document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const photoUpload = document.getElementById('photoUpload');
    const audioUpload = document.getElementById('audioUpload');
    const imagePreview = document.getElementById('imagePreview');
    const viewerImage = document.getElementById('viewerImage');
    const viewerAudio = document.getElementById('viewerAudio');
    const fileList = document.getElementById('fileList');
    const playButton = document.getElementById('playButton');
    const stopButton = document.getElementById('stopButton');
    const audioControls = document.querySelector('.audio-controls');

    let uploadedFiles = [];
    let fileCounter = 1;

    // Función para manejar la carga de archivos
    function handleFileUpload(file) {
        const fileType = file.type.split('/')[0]; // 'image' o 'audio'
        const fileName = `ENTRADA_${String(fileCounter++).padStart(3, '0')}.${fileType === 'image' ? 'JPG' : 'WAV'}`;
        const fileURL = URL.createObjectURL(file);

        uploadedFiles.push({
            name: fileName,
            type: fileType,
            url: fileURL,
            originalFile: file // Guardamos el archivo original para futuras referencias
        });

        // Añadir a la lista de archivos
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        fileItem.textContent = `> ${fileName}`;
        fileItem.dataset.type = fileType;
        fileItem.dataset.src = fileURL;
        fileItem.addEventListener('click', () => {
            selectFile(fileItem);
        });
        fileList.appendChild(fileItem);

        // Si es una imagen, mostrar en la vista previa del dropzone
        if (fileType === 'image') {
            imagePreview.src = fileURL;
            imagePreview.style.display = 'block';
            dropZone.querySelector('p').style.display = 'none';
        }
    }

    // Drag and Drop functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#00ff00';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#00aa00';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#00aa00';
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            handleFileUpload(files[i]);
        }
    });

    // Carga de archivo por botón
    photoUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    audioUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    // Función para seleccionar y mostrar un archivo en el visor
    function selectFile(selectedItem) {
        // Limpiar selección anterior
        document.querySelectorAll('.file-item').forEach(item => item.classList.remove('selected'));
        selectedItem.classList.add('selected');

        const type = selectedItem.dataset.type;
        const src = selectedItem.dataset.src;

        // Resetear visor
        viewerImage.style.display = 'none';
        viewerAudio.style.display = 'none';
        audioControls.style.display = 'none';
        viewerAudio.pause();
        viewerAudio.currentTime = 0;

        if (type === 'image') {
            viewerImage.src = src;
            viewerImage.style.display = 'block';
        } else if (type === 'audio') {
            viewerAudio.src = src;
            viewerAudio.style.display = 'block';
            audioControls.style.display = 'flex';
        }
    }

    // Controles de audio
    playButton.addEventListener('click', () => {
        if (viewerAudio.paused) {
            viewerAudio.play();
            playButton.textContent = 'PAUSE';
        } else {
            viewerAudio.pause();
            playButton.textContent = 'PLAY';
        }
    });

    stopButton.addEventListener('click', () => {
        viewerAudio.pause();
        viewerAudio.currentTime = 0;
        playButton.textContent = 'PLAY';
    });

    viewerAudio.addEventListener('ended', () => {
        playButton.textContent = 'PLAY';
    });

    // Cargar una imagen de placeholder inicial en el visor
    viewerImage.src = 'https://via.placeholder.com/600x400/000/00ff00?text=SIN+DATOS'; // Placeholder por defecto
    viewerImage.style.display = 'block';

    // Placeholder para la preview del dropzone
    imagePreview.src = 'https://via.placeholder.com/150x100/000/00ff00?text=PREVIEW';
});


