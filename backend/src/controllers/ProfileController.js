const connection = require('../database/connection')

module.exports = {
  async index (request, response) {
    const ong_id = request.headers.authorization

    try {
      const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*')
      return response.json(incidents)
    } catch (error) {
      return response
        .status(404)
        .json({ error })
    }
  }
}
