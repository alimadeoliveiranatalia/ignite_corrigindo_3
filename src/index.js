const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  let like = repositoryIndex.likes;
  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }
  if(title != null && title != repositoryIndex.title){
    repositoryIndex.title = title;
  }
  if(url != null){
    if (url.length < repositoryIndex.url.length || url.length > repositoryIndex.url.length){
    repositoryIndex.url = url;}
    repositoryIndex.url;
  }
  if(techs != null && techs != repositoryIndex.techs){
    repositoryIndex.techs = techs;
  }
  if (repositoryIndex.likes != like){
    repositoryIndex.likes = like;}
  return response.json(repositoryIndex);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  let li = repositoryIndex.likes;
  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = li+1;
  repositoryIndex.likes = likes;
});

module.exports = app;
