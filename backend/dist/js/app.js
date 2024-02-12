"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
const port = process.env.PORT || 8000;
//For Postgres
exports.client = new pg_1.Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
exports.client
    .connect()
    .then(() => console.log("Connected Successfully"))
    .catch((err) => console.log(err));
app.listen(port, () => {
    console.log(`Server is Fired at http://localhost:${port}`);
});
