const connnection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connnection("incidents").count();

    const incidents = await await connnection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connnection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },
  async delete(request, response) {
    console.log("DELETE");
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connnection("incidents")
      .where("id", id)
      .select("ong_id")
      .first(); //n retorna um array e sim o primeiro objeto buscado

    if (!incident) {
      return response.status(400).json({ error: "Incident not found." });
    }

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: "Operação não permitida!" });
    }

    await connnection("incidents")
      .where("id", id)
      .delete();

    return response.status(204).send();
  }
};
