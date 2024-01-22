"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = void 0;
const app_1 = require("../../app");
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, salary, address } = req.body;
    try {
        const response = yield app_1.client.query("INSERT INTO employee (name, email, salary, address) VALUES ($1, $2, $3, $4)", [name, email, salary, address]);
        res.status(201).json({
            message: "Employee Added Successfully",
            body: {
                employee: { name, email, salary, address },
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.createEmployee = createEmployee;
