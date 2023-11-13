document.addEventListener('DOMContentLoaded', () => {
    const elementoServidor = document.getElementById('id-coockie');

    //requisção
    fetch("https://desafio-cookie.vercel.app//cookie", {
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