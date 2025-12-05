import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const projects = [
  {
    title: 'E-commerce платформа',
    description: 'Полнофункциональный интернет-магазин с корзиной, фильтрами и интеграцией платёжных систем',
    tags: ['React', 'TypeScript', 'Redux', 'Stripe'],
    gradient: 'from-yellow-600 to-yellow-400',
  },
  {
    title: 'Dashboard аналитики',
    description: 'Интерактивная панель с графиками, таблицами и реал-тайм обновлениями данных',
    tags: ['React', 'Chart.js', 'WebSocket', 'Tailwind'],
    gradient: 'from-amber-600 to-yellow-500',
  },
  {
    title: 'Социальная сеть',
    description: 'Платформа для общения с постами, комментариями, лайками и системой друзей',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'NextAuth'],
    gradient: 'from-yellow-500 to-amber-400',
  },
  {
    title: 'Task менеджер',
    description: 'Приложение для управления задачами с drag-and-drop и командной работой',
    tags: ['React', 'DnD Kit', 'Zustand', 'Firebase'],
    gradient: 'from-yellow-600 to-orange-500',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Мои <span className="text-gradient">проекты</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Некоторые из моих последних работ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-card border-border hover-lift group"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Folder" size={64} className="text-white/30" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:border-primary/50"
                  >
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Демо
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:border-primary/50"
                  >
                    <Icon name="Github" size={16} className="mr-2" />
                    Код
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;