import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/1399c012-17b9-496a-9181-f855d4c8705b';

interface Project {
  id?: number;
  title: string;
  description: string;
  tags: string;
  gradient: string;
  demo_url?: string;
  github_url?: string;
}

interface Skill {
  id?: number;
  name: string;
  level: number;
  icon: string;
  color: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const [newProject, setNewProject] = useState<Project>({
    title: '',
    description: '',
    tags: '',
    gradient: 'from-yellow-600 to-yellow-400',
    demo_url: '#',
    github_url: ''
  });

  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    level: 50,
    icon: 'Code',
    color: 'text-primary'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        fetch(`${API_URL}?resource=projects`),
        fetch(`${API_URL}?resource=skills`)
      ]);
      
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      
      setProjects(projectsData);
      setSkills(skillsData);
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить данные',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    try {
      const response = await fetch(`${API_URL}?resource=projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      
      if (response.ok) {
        toast({ title: 'Проект добавлен' });
        loadData();
        setNewProject({
          title: '',
          description: '',
          tags: '',
          gradient: 'from-yellow-600 to-yellow-400',
          demo_url: '#',
          github_url: ''
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить проект',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}?resource=projects&id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast({ title: 'Проект удалён' });
        loadData();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить проект',
        variant: 'destructive'
      });
    }
  };

  const handleAddSkill = async () => {
    try {
      const response = await fetch(`${API_URL}?resource=skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      });
      
      if (response.ok) {
        toast({ title: 'Навык добавлен' });
        loadData();
        setNewSkill({
          name: '',
          level: 50,
          icon: 'Code',
          color: 'text-primary'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить навык',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}?resource=skills&id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast({ title: 'Навык удалён' });
        loadData();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить навык',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Админ-панель</h1>
          <p className="text-muted-foreground">Управление контентом портфолио</p>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Проекты</TabsTrigger>
            <TabsTrigger value="skills">Навыки</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Добавить проект</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Название проекта"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <Textarea
                  placeholder="Описание"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  rows={3}
                />
                <Input
                  placeholder="Теги (через запятую)"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                />
                <Input
                  placeholder="Градиент (например: from-yellow-600 to-yellow-400)"
                  value={newProject.gradient}
                  onChange={(e) => setNewProject({ ...newProject, gradient: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="URL демо"
                    value={newProject.demo_url}
                    onChange={(e) => setNewProject({ ...newProject, demo_url: e.target.value })}
                  />
                  <Input
                    placeholder="GitHub URL"
                    value={newProject.github_url}
                    onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddProject} className="w-full gradient-purple-pink">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить проект
                </Button>
              </div>
            </Card>

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.split(',').map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-muted rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id!)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Добавить навык</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Название навыка"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Уровень: {newSkill.level}%</label>
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                    />
                  </div>
                  <Input
                    placeholder="Иконка (Lucide)"
                    value={newSkill.icon}
                    onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                  />
                </div>
                <select
                  className="w-full p-2 bg-background border border-border rounded"
                  value={newSkill.color}
                  onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
                >
                  <option value="text-primary">Золотой</option>
                  <option value="text-secondary">Оранжевый</option>
                  <option value="text-accent">Акцент</option>
                </select>
                <Button onClick={handleAddSkill} className="w-full gradient-purple-pink">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить навык
                </Button>
              </div>
            </Card>

            <div className="grid gap-4">
              {skills.map((skill) => (
                <Card key={skill.id} className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 flex-1">
                      <Icon name={skill.icon as any} size={24} className={skill.color} />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{skill.name}</div>
                        <div className="text-sm text-muted-foreground">{skill.level}%</div>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSkill(skill.id!)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
