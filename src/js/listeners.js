var campoFiltro = document.querySelector('#filtrar-users');
var radios = document.getElementsByName('ordenar');
var wrapperdws = document.getElementById('dws');

var user = document.getElementById('user');
var org = document.getElementById('org');

var campovazio = async () => {
  reset();
  for (let i = 0; i < qtd; i++) {
    let user = await localStorageGetItem(usersData[i].login);
    await GerarUsers(user);
  }
};

campoFiltro.addEventListener('keypress', (key) => {
  loader(true);
  if (key.which == 13) {
    filtro(campoFiltro);
  }
  if (!campoFiltro.value) {
    campovazio();
  }
  loader(false);
});

campoFiltro.addEventListener('input', async () => {
  loader(true);
  if (!campoFiltro.value) {
    await campovazio();
    wrapperdws.style.display = 'none';
  } else {
    wrapperdws.style.display = 'block';
  }
  loader(false);
});

window.addEventListener('scroll', () => {
  scroll();
});

user.addEventListener('click', async () => {
  loader(true);
  campoFiltro.value = '';
  wrapperdws.style.display = 'none';
  if (!campoFiltro.value) {
    await campovazio();
  }

  loader(false);
});
org.addEventListener('click', async () => {
  loader(true);
  campoFiltro.value = '';
  wrapperdws.style.display = 'none';
  if (!campoFiltro.value) {
    await campovazio();
  }
  loader(false);
});

for (var el of radios) {
  el.addEventListener('click', function () {
    campoFiltro.value = '';
    loaderOrdem(true);
    ordenar(this.value).then(() => {
      reset();
      qtd = 0;
      newRequest(usersData);
      loaderOrdem(false);
      ShowToast(`Ordenado por ${this.id}`);
    });
  });
}

wrapperdws.addEventListener('click', async () => {
  loader(true);
  await filtro(campoFiltro);
  loader(false);
});
