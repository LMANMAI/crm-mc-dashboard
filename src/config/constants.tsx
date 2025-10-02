export const PREFIX = {
  BASE: `http://localhost:3001`,
};

//devuelvo la base
const withBase = (path: string) => `${PREFIX.BASE}${path}`;
//devuelvo la base mas el id ej: get product id
const byId = (base: string, id: string | number) => `${base}/${id}`;

/** Auth */
export const AUTH = {
  SIGNUP: withBase(`/auth/signup`), // POST - Crear usuario
  SIGNIN: withBase(`/auth/signin`), // POST - Iniciar sesión
};

/** Users */
const USERS_BASE = withBase(`/users`);
export const USERS = {
  LIST: USERS_BASE, // GET - listar usuarios
  UPDATE: (id: string | number) => byId(USERS_BASE, id), // PUT - actualizar usuario
  DELETE: (id: string | number) => byId(USERS_BASE, id), // DELETE - eliminar usuario

  // Acciones especiales
  CHANGE_ROLE: (id: string | number) => withBase(`/users/role/${id}`), // PUT - cambiar rol
  ACTIVATE: (id: string | number) => withBase(`/users/active/${id}`), // PUT - activar usuario
  INACTIVATE: (id: string | number) => withBase(`/users/inactive/${id}`), // PUT - inactivar usuario
};

/** Products */
const PRODUCTS_BASE = withBase(`/products`);
export const PRODUCTS = {
  LIST: PRODUCTS_BASE, // GET
  CREATE: PRODUCTS_BASE, // POST
  GET: (id: string | number) => byId(PRODUCTS_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(PRODUCTS_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(PRODUCTS_BASE, id), // DELETE /:id
};

/** Color */
const COLOR_BASE = withBase(`/color`);
export const COLOR = {
  LIST: COLOR_BASE, // GET
  CREATE: COLOR_BASE, // POST
  GET: (id: string | number) => byId(COLOR_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(COLOR_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(COLOR_BASE, id), // DELETE /:id
};

/** Click */
const CLICK_BASE = withBase(`/click`);
export const CLICK = {
  LIST: CLICK_BASE, // GET
  CREATE: CLICK_BASE, // POST
  GET: (id: string | number) => byId(CLICK_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(CLICK_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(CLICK_BASE, id), // DELETE /:id
};

/** Endings (terminaciones) */
const ENDINGS_BASE = withBase(`/endings`);
export const ENDINGS = {
  LIST: ENDINGS_BASE, // GET
  CREATE: ENDINGS_BASE, // POST
  GET: (id: string | number) => byId(ENDINGS_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(ENDINGS_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(ENDINGS_BASE, id), // DELETE /:id
};

/** Paper (papeles) */
const PAPER_BASE = withBase(`/paper`);
export const PAPER = {
  LIST: PAPER_BASE, // GET
  CREATE: PAPER_BASE, // POST
  GET: (id: string | number) => byId(PAPER_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(PAPER_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(PAPER_BASE, id), // DELETE /:id
};

/** Sizes (tamaños) */
const SIZE_BASE = withBase(`/size`);
export const SIZES = {
  LIST: SIZE_BASE, // GET
  CREATE: SIZE_BASE, // POST
  GET: (id: string | number) => byId(SIZE_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(SIZE_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(SIZE_BASE, id), // DELETE /:id
};

/** Sheet Charge (cargos de hoja) */
const SHEET_CHARGE_BASE = withBase(`/sheet-charge`);
export const SHEET_CHARGE = {
  LIST: SHEET_CHARGE_BASE, // GET
  CREATE: SHEET_CHARGE_BASE, // POST
  GET: (id: string | number) => byId(SHEET_CHARGE_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(SHEET_CHARGE_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(SHEET_CHARGE_BASE, id), // DELETE /:id
};

/** Orders */
const ORDERS_BASE = withBase(`/orders`);
export const ORDERS = {
  LIST: ORDERS_BASE, // GET
  CREATE: ORDERS_BASE, // POST
  GET: (id: string | number) => byId(ORDERS_BASE, id), // GET /:id
  CHANGE_STATUS: (id: string | number) => withBase(`/orders/${id}/status`), // POST - change order status
};

/** Order Product (productos de la orden) */
const ORDER_PRODUCT_BASE = withBase(`/order-product`);
export const ORDER_PRODUCT = {
  LIST: ORDER_PRODUCT_BASE, // GET - obtener todos los productos de la orden
  CREATE: ORDER_PRODUCT_BASE, // POST - crear
  GET: (id: string | number) => byId(ORDER_PRODUCT_BASE, id), // GET /:id
  UPDATE: (id: string | number) => byId(ORDER_PRODUCT_BASE, id), // PUT /:id
  DELETE: (id: string | number) => byId(ORDER_PRODUCT_BASE, id), // DELETE /:id
};
