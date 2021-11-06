import { Request, Response } from 'express';
import User from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const addNewUser = async (req: Request, res: Response) => {
    let name = {firstName: req.body.firstName, lastName: req.body.lastName};
    let email: string = req.body.email;
    let age: number = parseInt(req.body.age);
    let interests = req.body.interests.split(',');

    let user = new User();
    user.name = name;
    user.email = email;
    user.age = age;
    user.interests = interests;

    try {
        await user.save();
        console.log('Usuario adicionado com sucesso!');
    }catch(error) {
        console.log('Erro ao adicionar o usuario - ', error);
    }

    res.redirect('/');
}

export const incrementAgeAction = async (req: Request, res: Response) => {
    let userId = req.params.id;
    let user = await User.findOne({_id: userId});
    user.age++;

    try {
        await user.save();
    }catch(error) {
        console.log(error)
    }
    
    res.redirect('/');
}