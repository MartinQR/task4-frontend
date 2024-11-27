const columns = [
  { name: "NAME", uid: "name" },
  { name: "E-MAIL", uid: "email" },
  { name: "STATUS", uid: "status" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "LAST LOGIN", uid: "lastLogin" },
];

const users = [
  {
    id: 1,
    first_name: "Nombre1",
    last_name: "Apellido1",
    status: "active",
    email: "tony.reichert@example.com",
    created_at: "2024-11-23T12:12:18.000Z",
    last_login: 'Prueba'
  },
  {
    id: 2,
    first_name: "Nombre2",
    last_name: "Apellido2",
    status: "paused",
    email: "zoey.lang@example.com",
    created_at: "2024-11-23T12:12:18.000Z",
  },
  {
    id: 3,
    first_name: "Nombre3",
    last_name: "Apellido3",

    status: "active",
    email: "jane.fisher@example.com",
    created_at: "2024-11-23T12:12:18.000Z",
  },
];

export { columns, users };
