document.addEventListener('DOMContentLoaded', () => {
    const elementoServidor = document.getElementById('id-coockie');

    //requisção
    fetch("https://desafio-cookie-ojrb0jw1d-flavias-projects-5588c827.vercel.app/cookie", {
        credentials: 'include'
    })
    .then(response => response.json()) 
    .then(data => {
        elementoServidor.innerText = `${data.id_cookie}`;
    })
    .catch(error => {
        elementoServidor.innerText = 'Erro ao carregar o servidor!';
        console.log(error);
    });
});