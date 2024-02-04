function showVideo(language) {
    var videoUrl = getVideoUrlForLanguage(language);

    var videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '<iframe width="100%" height="100%" src="' + videoUrl + '" frameborder="0" allowfullscreen></iframe>';
    videoContainer.style.display = 'block';
    document.getElementById('languageSelectionButton').style.display = 'block';

    var idiomas = document.querySelector('.idiomas');
    idiomas.style.display = 'none';

    localStorage.setItem('language', language);
}

function getVideoUrlForLanguage(language) {
    var instructionSite = getCurrentInstructionSite();
    var videoUrls = {
        'instructions1': { // Acidic solution
            'en': 'https://www.youtube.com/embed/3vsd2rb3iBU',
            'fr': 'https://www.youtube.com/embed/JVru0a818B4',
            'es': 'https://www.youtube.com/embed/5GI4iiW6Kfg',
            'de': 'https://www.youtube.com/embed/oggoB-ZILU0',
            'nl': 'https://www.youtube.com/embed/dFUXCdT7Ps8',
            'nb': 'https://www.youtube.com/embed/z4MelvKku08'
        },
        'instructions2': { // Neutral solution
            'en': 'https://www.youtube.com/embed/aQCeTKLzg3g',
            'fr': 'https://www.youtube.com/embed/Xcw8oJAFnE0',
            'es': 'https://www.youtube.com/embed/kwBc4fl_Qd0',
            'de': 'https://www.youtube.com/embed/auWrAsqbXsc',
            'nl': 'https://www.youtube.com/embed/9qwV1ales1U',
            'nb': 'https://www.youtube.com/embed/qHtIGl92Jks',
        },
        'instructions3': { // Color indicator
            'en': 'https://www.youtube.com/embed/PZBN9ajBWOk',
            'fr': 'https://www.youtube.com/embed/4YGolp4HpCQ', // Falta subir
            'es': 'https://www.youtube.com/embed/3tA6etkjHYo', // Falta subir
            'de': 'https://www.youtube.com/embed/ZTFvDE2c88w',
            'nl': 'https://www.youtube.com/embed/kTKr_AB8BlY', // Falta subir
            'nb': 'https://www.youtube.com/embed/voK55sAvoH0', // Falta subir
        },
        'instructions4': { // Basic solution
            'en': 'https://www.youtube.com/embed/_8T-_jlSna0',
            'fr': 'https://www.youtube.com/embed/4YGolp4HpCQ',
            'es': 'https://www.youtube.com/embed/3tA6etkjHYo',
            'de': 'https://www.youtube.com/embed/7rI63Ulkrrc',
            'nl': 'https://www.youtube.com/embed/kTKr_AB8BlY',
            'nb': 'https://www.youtube.com/embed/voK55sAvoH0'
        },
    };
    return videoUrls[instructionSite][language];
}

function getCurrentInstructionSite() {
    var currentUrl = window.location.href;
    if (currentUrl.includes('instructions1')) {
        return 'instructions1';
    } else if (currentUrl.includes('instructions2')) {
        return 'instructions2';
    } else if (currentUrl.includes('instructions3')) {
        return 'instructions3';
    } else if (currentUrl.includes('instructions4')) {
        return 'instructions4';
    }
}

function toggleLanguageSelection() {
    var languageSelection = document.getElementById('languageSelection');
    showLanguageSelection(languageSelection);
}

function showLanguageSelection(languageSelection) {
    var videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '';
    videoContainer.style.display = 'none';

    document.getElementById('languageSelectionButton').style.display = 'none';

    var idiomas = document.querySelector('.idiomas');
    idiomas.style.display = 'block';

    languageSelection.style.display = 'block';
    languageSelection.classList.remove('fade-in');
    void languageSelection.offsetWidth;
    languageSelection.classList.add('fade-in');
}

function main() {
    var currentUrl = window.location.href;
    if (currentUrl.includes('instructions1')) {
        document.getElementById('instructions').innerHTML = 'Instructions 1';
    } else if (currentUrl.includes('instructions2')) {
        document.getElementById('instructions').innerHTML = 'Instructions 2';
    } else if (currentUrl.includes('instructions3')) {
        document.getElementById('instructions').innerHTML = 'Instructions 3';
    } else if (currentUrl.includes('instructions4')) {
        document.getElementById('instructions').innerHTML = 'Instructions 4';
    } else {
        console.log('Referrer does not match any expected URL');
    }

    // Check if the language is stored in localStorage
    var storedLanguage = localStorage.getItem('language');
    if (storedLanguage !== null) {
        // If a language is stored, load the video for that language
        showVideo(storedLanguage);
    } else {
        // If no language is stored, display the language selection
        showLanguageSelection(document.getElementById('languageSelection'));
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    main();
});
