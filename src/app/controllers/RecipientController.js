import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      zip_code: Yup.string().required().max(8),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required().max(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = await Recipient.create(req.body);

    return res.json({
      id,
    });
  }
}

export default new RecipientController();
