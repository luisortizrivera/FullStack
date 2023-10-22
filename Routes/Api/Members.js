const express = require("express");
const router = express.Router();
const members = require("../../Entities/Members");
const uuid = require("uuid");

router.get("/", (req, res) => res.json(members));
router.get("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const member = members.find((member) => member.id === id);

	if (!member) {
		console.log(`Member with id ${id} not found.`);
		res.status(400).json({ message: `No member with the id ${id}` });
	} else res.json(member);
});

//Create Member
router.post("/", (req, res) => {
	const name = req.body?.name;
	const email = req.body?.email;
	if (!name || !email)
		return res.status(400).json({ message: "Please include a name and email" });

	if (
		members.find((member) => member.name === name) &&
		members.find((member) => member.email === email)
	) {
		return res.status(400).json({
			message: `A member with the same name: ${name} and email: ${email} already exists`,
		});
	}
	members.push({ id: uuid.v4(), name, email });
	res.json(members);
});

// delete member
router.delete("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const member = members.find((member) => member.id === id);

	if (!member) res.status(400).json({ message: `No member with the id ${id}` });
	const index = members.indexOf(member);
	members.splice(index, 1);
	res.json(members);
});

module.exports = router;
