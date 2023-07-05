export const environment = {
	production: false
};

export const baseUrl = 'http://localhost:3000/'; //Aquì va la url

export const urls = {
	login: baseUrl + 'user/login',
  register: baseUrl + 'user/registrar',
	logout: baseUrl + 'logout',
  verUsu:baseUrl + 'user/ver/',
  listarUsu:baseUrl + 'user/listado',
  movimientos:baseUrl + 'user/movimientos',
  createDeposito: baseUrl + 'deposito/registrar',
  createRetiro: baseUrl + 'retiro/registrar',
  createTrasnferecia:baseUrl + 'transferencia/registrar'
};
