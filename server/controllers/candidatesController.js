const { Candidate } = require("./../models");
const { Op } = require("sequelize");
const Joi = require("joi");

class candidatesController {
  static async getCandidate(req, res) {
    try {
      const { page = 1, limit = 4, search } = req.query;
      const query = {};

      // Applying live search if "search" query is present
      if (search) {
        query.full_name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      // Calculating offset for pagination
      const offset = (page - 1) * limit;

      // Getting candidates with pagination and search
      const candidates = await Candidate.findAndCountAll({
        where: query,
        offset,
        limit: Number(limit),
        order: [["id", "DESC"]],
      });

      res
        .status(200)
        .json({ ...candidates, page: Number(page), limit: Number(limit) });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to get candidates.",
      });
    }
  }

  static async getCandidateById(req, res) {
    try {
      const { id } = req.params;

      // Cari kandidat berdasarkan ID
      const candidate = await Candidate.findByPk(id);

      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: "Candidate not found.",
        });
      }

      res.status(200).json({
        success: true,
        candidate,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to get candidate.",
      });
    }
  }

  static async createCandidate(req, res) {
    try {
      // schema validate using package Joi
      const candidateSchema = Joi.object({
        full_name: Joi.string().required(),
        dob: Joi.string().required(),
        pob: Joi.string().required(),
        gender: Joi.string().valid("M", "F").required(),
        year_exp: Joi.string().required(),
        last_salary: Joi.string(),
      });

      const { error, value } = candidateSchema.validate(req.body);

      if (error) {
        // Jika terjadi kesalahan validasi, kembalikan pesan error
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      // Membuat kandidat baru dalam database
      const candidate = await Candidate.create(value);

      res.status(201).json({
        success: 201,
        candidate,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to create candidate.",
      });
    }
  }

  static async updateCandidate(req, res) {
    try {
      const { id } = req.params;
      const { full_name, dob, pob, gender, year_exp, last_salary } = req.body;

      // Cari kandidat berdasarkan ID
      const candidate = await Candidate.findByPk(id);

      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: "Candidate not found.",
        });
      }

      // Validasi gender harus "M" atau "F"
      if (gender && !["M", "F"].includes(gender)) {
        return res.status(400).json({
          success: false,
          message: "Invalid gender value. Gender must be M or F.",
        });
      }

      // Perbarui atribut kandidat yang diberikan
      if (full_name) {
        candidate.full_name = full_name;
      }
      if (dob) {
        candidate.dob = dob;
      }
      if (pob) {
        candidate.pob = pob;
      }
      if (gender) {
        candidate.gender = gender;
      }
      if (year_exp) {
        candidate.year_exp = year_exp;
      }
      if (last_salary) {
        candidate.last_salary = last_salary;
      }

      // Simpan perubahan pada kandidat
      await candidate.save();

      res.status(200).json({
        success: true,
        candidate,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to create candidate.",
      });
    }
  }

  static async deleteCandidate(req, res) {
    try {
      const { id } = req.params;

      // Cari kandidat berdasarkan ID
      const candidate = await Candidate.findByPk(id);

      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: "Candidate not found.",
        });
      }

      // Hapus kandidat
      await candidate.destroy();

      res.status(200).json({
        success: true,
        message: "Candidate deleted successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to delete candidate.",
      });
    }
  }
}

module.exports = candidatesController;
