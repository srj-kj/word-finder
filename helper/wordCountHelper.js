import axios from "axios";
import { load } from "cheerio";
import Website from "../model/websiteSchema.js";
import { v4 as uuidv4 } from 'uuid';

export const wordcountFind = async (data) => {
  try {
    let { url, userId } = data;

    const domain = url.startsWith("http") ? url : `https://${url}`;
    const response = await axios.get(domain);

    const htmlContent = response.data;

    const $ = load(htmlContent);

    const text = $("body").text();

    const words = text.split(/\s+/);

    const filteredWords = words.filter((word) => word !== "");

    const wordCount = filteredWords.length;

    const mediaLinks = [];
    $("img, video, audio").each((index, element) => {
      const mediaLink = $(element).attr("src");
      if (mediaLink) {
        const absoluteLink = new URL(mediaLink, domain).href;
        mediaLinks.push(absoluteLink);
      }
    });

    const formattedMediaLinks = mediaLinks.map((link) => {
      const urlObj = new URL(link);
      const formattedLink = urlObj.searchParams.get("url") || link;
      let absoluteLink = new URL(formattedLink, domain).href;
      absoluteLink = absoluteLink.replace(/^(https?:\/\/)\/+/i, "$1");

      return absoluteLink;
    });

    const filteredLinks = formattedMediaLinks.filter((link) =>
      link.startsWith("https")
    );

    const id  = uuidv4();

    let details = {id, domain, wordCount, favourite: false, filteredLinks };
    let website = await Website.findOne({ userId });

    if (website) {
      website.data.push(details);
      await website.save();
    } else {
      await Website.create({ userId, data: [details] });
    }
  } catch (error) {
    console.error("Error retrieving website content:", error.message);
    const err = { message: error.message, statusCode: 400 };
    throw err;
  }
};

export const getAllDatas = async (userId) => {
  const website = await Website.findOne({ userId }, "data");
  if (!website) {
    const err = { message: "No Results Found", statusCode: 400 };
    throw err;
  } else {
    return website.data;
  }
};

export const deleteData = async (userId, id) => {
    const website = await Website.findOne({ userId });
    if (!website) {
      const err = { message: "No Results Found", statusCode: 400 };
      throw err;
    }
  
    const itemIndex = website.data.findIndex((item) => item.id === id);
   
    if (itemIndex >= 0) {
      website.data.splice(itemIndex, 1);
      await website.save();
      return website.data;
    } else {
      const err = { message: "Item not found", statusCode: 400 };
      throw err;
    }
  };

export const addToFavourite = async (userId, id) => {
  const website = await Website.findOne({ userId });
  if (!website) {
    const err = { message: "No Results Found", statusCode: 400 };
    throw err;
  }

  const favouriteData = website.data.find((item) => item.id === id);
  if (favouriteData) {
    favouriteData.favourite = true;
    website.markModified("data");
    await website.save();
    return favouriteData;
  } else {
    const err = { message: "Invalid index", statusCode: 400 };
    throw err;
  }
};
