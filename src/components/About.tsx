import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Обо <span className="text-gradient">мне</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Увлечённый разработчик с фокусом на создании качественных интерфейсов
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card border-border hover-lift">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">Привет! 👋</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Я фронтенд-разработчик с опытом создания современных веб-приложений. 
                  Специализируюсь на React, TypeScript и современных фреймворках.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Люблю превращать сложные задачи в простые и элегантные решения. 
                  Стремлюсь писать чистый, поддерживаемый код и создавать 
                  отличный пользовательский опыт.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-4 py-2 bg-primary/10 rounded-full text-sm border border-primary/20">
                    React
                  </span>
                  <span className="px-4 py-2 bg-secondary/10 rounded-full text-sm border border-secondary/20">
                    TypeScript
                  </span>
                  <span className="px-4 py-2 bg-accent/10 rounded-full text-sm border border-accent/20">
                    Tailwind CSS
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="Code" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Чистый код</h4>
                    <p className="text-sm text-muted-foreground">
                      Пишу поддерживаемый и масштабируемый код, следуя лучшим практикам
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Icon name="Palette" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Современный дизайн</h4>
                    <p className="text-sm text-muted-foreground">
                      Создаю красивые, отзывчивые интерфейсы с вниманием к деталям
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Icon name="Zap" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Производительность</h4>
                    <p className="text-sm text-muted-foreground">
                      Оптимизирую приложения для быстрой загрузки и плавной работы
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
