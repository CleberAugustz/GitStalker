var qtd = 0;
const scroll = async () => {
  loader(true);
  let scrollPos =
    parseInt(
      document.documentElement.scrollTop +
        document.documentElement.clientHeight,
    ) +
      1 >=
    document.documentElement.scrollHeight;
  if (scrollPos === true && !campoFiltro.value && loading) {
    console.log('Executou');
    qtd = qtd + 5;
    loader(true);
    await (async () => {
      for (let i = qtd; i < qtd + 5; i++) {
        let data = await (async () => {
          let data = !!localStorage.getItem(usersData[i].login)
            ? (() => {
                return JSON.parse(
                  localStorage.getItem(usersData[i].login),
                );
              })()
            : (async () => {
                let data = await userInfo(usersData[i]);
                localStorage.setItem(
                  data.login,
                  JSON.stringify(data),
                );
                return data;
              })();
          return data;
        })();
        carregarUsers(data);
      }
    })();
    loader(false);
  }
  loader(false);
};