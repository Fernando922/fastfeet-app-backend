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

  async index(req, res) {
    const content = await Recipient.findAll({});
    return res.json(content);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'id not provided' });
    }

    const user = await Recipient.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }

    await Recipient.destroy({ where: { id } });
    return res.status(204).send();
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await Recipient.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    return res.json(user);
  }

  async update(req, res) {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({ error: 'id not provided' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      zip_code: Yup.string().max(8),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string().max(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    await Recipient.update(req.body, {
      where: { id },
    });

    return res.status(204).send();
  }
}

export default new RecipientController();
