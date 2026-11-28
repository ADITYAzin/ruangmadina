import { useTranslation } from "react-i18next";
import ArcGallery, { type ArcGalleryItem } from "./ArcGallery";

const GALLERY_IMAGES: Record<string, string> = {
  team_model: "/dpk-2.webp",
  blueprint_review:
    "https://images.pexels.com/photos/5584052/pexels-photo-5584052.jpeg?auto=compress&cs=tinysrgb&w=900",
  material_studio: "/kurasi-material.png",
  wood_craft: "/pengerjaan-kayu.png",
  workshop_floor: "/perakitan-furniture.png",
  site_measure: "/pengukuran.png",
  interior_progress: "/inspeksi.png",
};

const ITEM_IDS = [
  "team_model",
  "blueprint_review",
  "material_studio",
  "wood_craft",
  "workshop_floor",
  "interior_progress",
  "site_measure",
] as const;

export default function AboutArcGallery() {
  const { t } = useTranslation();

  const items: ArcGalleryItem[] = ITEM_IDS.map((id) => {
    const caption = t(`about.gallery.${id}`);
    return {
      id,
      image: GALLERY_IMAGES[id],
      alt: caption,
      caption,
    };
  });

  return <ArcGallery items={items} ariaLabel={t("about.galleryLabel")} />;
}
