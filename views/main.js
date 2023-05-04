
    const btnWriteMail = document.querySelector('.btn-write-Email');
    const btnCloseMailBox = document.querySelector('.btn-close-mail-box');
    const mailBox = document.querySelector('.send-email-box');
    const btnUser = document.querySelector('.user-wrapper')
    const menuUser = document.querySelector('.user-menu')

    btnWriteMail.addEventListener('click', () => {
        mailBox.classList.remove("display-mail-box");
    })

    btnCloseMailBox.addEventListener('click', () => {
        mailBox.classList.add("display-mail-box");
    })

    let isMenuOpen = false;

    btnUser.addEventListener('click', () => {
        if (isMenuOpen) {
            menuUser.classList.remove('display-menu-user');
            isMenuOpen = false
        } else {
            menuUser.classList.add('display-menu-user');
            isMenuOpen = true;
        }
    })
