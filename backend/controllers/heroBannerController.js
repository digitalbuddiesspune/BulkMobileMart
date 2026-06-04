import HeroBanner from "../models/HeroBanner.js";

export const getHeroBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllHeroBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addHeroBanner = async (req, res) => {
  try {
    const { imageUrl, alt, order, isActive } = req.body;

    if (!imageUrl?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Image URL is required" });
    }

    const banner = await HeroBanner.create({
      imageUrl: imageUrl.trim(),
      alt: alt?.trim() || "BulkMobileMart hero banner",
      order: order ?? 0,
      isActive: isActive ?? true,
    });

    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHeroBanner = async (req, res) => {
  try {
    const banner = await HeroBanner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Hero banner not found" });
    }

    res.status(200).json({ success: true, message: "Hero banner deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
