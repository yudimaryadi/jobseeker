const { Candidate } = require("./../models");
const { Op } = require("sequelize");

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

      // Counting total number of candidates
      const totalCount = await Candidate.count({ where: query });

      // Calculating offset for pagination
      const offset = (page - 1) * limit;

      // Getting candidates with pagination and search
      const candidates = await Candidate.findAndCountAll({
        where: query,
        offset,
        limit: Number(limit),
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
}

module.exports = candidatesController;
