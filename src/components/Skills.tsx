import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const skills = [
  { name: 'React & Next.js', level: 95, icon: 'Code', color: 'text-primary' },
  { name: 'TypeScript', level: 90, icon: 'FileCode', color: 'text-secondary' },
  { name: 'Tailwind CSS', level: 92, icon: 'Palette', color: 'text-accent' },
  { name: 'Redux & Zustand', level: 85, icon: 'Database', color: 'text-primary' },
  { name: 'REST API', level: 88, icon: 'Globe', color: 'text-secondary' },
  { name: 'Git & GitHub', level: 90, icon: 'GitBranch', color: 'text-accent' },
];

const tools = [
  { name: 'Vite', icon: 'Zap' },
  { name: 'Figma', icon: 'Figma' },
  { name: 'VS Code', icon: 'Code2' },
  { name: 'npm/yarn', icon: 'Package' },
  { name: 'Vercel', icon: 'Rocket' },
  { name: 'Postman', icon: 'Send' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Мои <span className="text-gradient">навыки</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Технологии, с которыми я работаю
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border-border mb-8">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Icon name="Code" size={28} className="text-primary" />
              Основные технологии
            </h3>
            
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Icon name={skill.icon as any} size={20} className={skill.color} />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 md:p-12 bg-card border-border">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Icon name="Wrench" size={28} className="text-secondary" />
              Инструменты
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                >
                  <Icon 
                    name={tool.icon as any} 
                    size={32} 
                    className="text-muted-foreground group-hover:text-foreground transition-colors" 
                  />
                  <span className="text-sm font-medium text-center">{tool.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
