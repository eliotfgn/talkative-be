import { Category } from '@prisma/client';
import { Request, Response } from "express";
import CategoryService from "../services/category/category.service";
import { CategoryDtoType } from "../services/category/category.dto";
import logger from '../utils/logger';

export default class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    create = async (request: Request, response: Response) => {
        const categoryPayload: CategoryDtoType = request.body;
        try {
            const category: Category = await this.categoryService.create(categoryPayload);
            
            response.status(201).json({
                success: true,
                message: 'Category successfully created',
                data: category
            });
        } catch (error: any) {
            logger.error(error.message);
        }
    }
}