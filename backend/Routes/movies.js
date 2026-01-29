const express = require('express');
const MovieController = require('../Controllers/MovieController');

const router = express.Router();

router.get('/', MovieController.list);
router.get('/:id', MovieController.get);
router.post('/', MovieController.create);
router.put('/:id', MovieController.update);
router.delete('/:id', MovieController.remove);

// Nested resources
router.get('/:movieId/assets', MovieController.listAssets);
router.get('/:movieId/collaborators', MovieController.listCollaborators);

router.get('/:movieId/tags', MovieController.listTags);
router.post('/:movieId/tags', MovieController.addTag); // body: { label }
router.delete('/:movieId/tags/:tagId', MovieController.removeTag);

router.get('/:movieId/ai-declaration', MovieController.getAiDeclaration);
router.put('/:movieId/ai-declaration', MovieController.upsertAiDeclaration);

module.exports = router;

