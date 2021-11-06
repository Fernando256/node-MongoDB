import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User from '../models/User';

export const home = async (req: Request, res: Response)=>{
    try {
       let user =  await User.findOne(
            {email: 'jao@jao.com'}
        );
        await user.remove();
    }catch(error) {
        console.log(error);
    }
    

    let users = await User.find({}).sort({'name.firstName': 1});

    res.render('pages/home', {
        users
    });
};