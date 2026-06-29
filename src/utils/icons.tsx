import React from 'react';
import {
  Palette, Binary, BugPlay, Layout, Braces, Workflow, Zap, Repeat,
  Award, Cpu, Terminal, MousePointerClick, Sparkles, Route, Box, ArrowRight,
  Code2
} from 'lucide-react';

const iconRegistry: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Palette, Binary, BugPlay, Layout, Braces, Workflow, Zap, Repeat,
  Award, Cpu, Terminal, MousePointerClick, Sparkles, Route, Box, ArrowRight,
  Code2,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className }) => {
  const Component = iconRegistry[name];
  if (!Component) return null;
  return <Component size={size} className={className} />;
};
