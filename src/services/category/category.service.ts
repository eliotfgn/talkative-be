import { Category } from "@prisma/client";
import categoryRepository from "../../repositories/category.repository";
import { CategoryDtoType } from "./category.dto";

class CommentService {
    async create(payload : CategoryDtoType): Promise<Category> {
        const data = await categoryRepository.create({
            data: payload,
        });

        return data;
    }

    async findAll() : Promise<Category[]> {
        return await categoryRepository.findMany();
    }

    async findById(id: number): Promise<Category> {
        return await categoryRepository.findFirstOrThrow({ where: {id}});
    }
}