import { IgApiClient } from 'instagram-private-api';
import fs from 'fs';
import { config } from '../config/config.js';

export default async function postStories() {
  const instagram = new IgApiClient();
  instagram.state.generateDevice(config.instagram.username);
  
  const path = "../build/meal.jpeg"
  const file = await fs.readFileAsync(path)

  await ig.publish.story({
    file
  })
}
