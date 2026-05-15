export interface SceneData {
  id: number;
  image: string | null;
  title: string | null;
  subtitle: string;
}

export interface SceneProps {
  scene: SceneData;
  index: number;
  isLast?: boolean;
}