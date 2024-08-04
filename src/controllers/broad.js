import catchAsync from "../utils/catchAsync";
import * as broadService from "../services/broad";
import httpStatus from "http-status";

export const index = catchAsync(async (req, res) => {
    
    const broads = await broadService.index();
    
    res.status(httpStatus.OK).send({ broads });
});

export const create = catchAsync(async (req, res) => {
    const { title, background } = req.body;
    
    const broad = await broadService.create({ title, background });
    
    res.status(httpStatus.CREATED).send({ broad });
});

export const show = catchAsync(async (req, res) => {
    const { id } = req.params;
    
    const broad = await broadService.show({ id });
    
    res.status(httpStatus.OK).send({ broad });
});

export const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, background } = req.body;
    
    const broad = await broadService.update({ id, title, background });
    
    res.status(httpStatus.OK).send({ broad });
});

export const updatePosition = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { type, source, destination } = req.body;
    
    const broad = await broadService.updatePosition({ id, type, source, destination });
    
    res.status(httpStatus.OK).send({ broad });
});

export const updateItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { content, status } = req.body;
    
    const item = await broadService.updateItem({ id, content, status });
    
    res.status(httpStatus.OK).send({ item });
});

export const addColumn = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, columnId } = req.body;
    
    const broad = await broadService.addColumn({ id, title, columnId });
    
    res.status(httpStatus.OK).send({ broad });
});

export const addItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    
    const broad = await broadService.addItem({ id, content });
    
    res.status(httpStatus.OK).send({ broad });
});