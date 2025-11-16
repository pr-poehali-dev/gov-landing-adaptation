import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      id: 1,
      question: 'В каком году было образовано Правительство Москвы?',
      options: ['1991', '1993', '1995', '2000'],
      correct: 1
    },
    {
      id: 2,
      question: 'Какой орган возглавляет исполнительную власть в Москве?',
      options: ['Мэрия', 'Правительство Москвы', 'Городская дума', 'Префектура'],
      correct: 1
    },
    {
      id: 3,
      question: 'Сколько департаментов входит в структуру Правительства Москвы?',
      options: ['Около 20', 'Около 30', 'Около 40', 'Около 50'],
      correct: 2
    }
  ];

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const submitQuiz = () => {
    let correct = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    setQuizScore(Math.round((correct / quizQuestions.length) * 100));
  };

  const team = [
    { name: 'Иван Петров', position: 'Руководитель департамента', image: '👨‍💼' },
    { name: 'Мария Соколова', position: 'Заместитель руководителя', image: '👩‍💼' },
    { name: 'Алексей Новиков', position: 'Начальник отдела', image: '👨‍💻' },
    { name: 'Елена Волкова', position: 'Главный специалист', image: '👩‍💻' }
  ];

  const achievements = [
    { year: '2020', title: 'Цифровизация госуслуг', description: 'Запуск портала mos.ru' },
    { year: '2021', title: 'Умный город', description: 'Внедрение системы умного управления' },
    { year: '2022', title: 'Социальные программы', description: 'Расширение поддержки граждан' },
    { year: '2023', title: 'Экология', description: 'Зеленые проекты Москвы' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Building2" className="text-primary" size={32} />
              <span className="text-xl font-bold text-primary">Правительство Москвы</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {['Главная', 'История', 'Структура', 'Команда', 'Квиз', 'Карьера'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['hero', 'history', 'structure', 'team', 'quiz', 'career'][index])}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === ['hero', 'history', 'structure', 'team', 'quiz', 'career'][index]
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="text-sm px-4 py-2">Добро пожаловать</Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Правительство Москвы
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Мы создаем современный город для комфортной жизни каждого жителя. Добро пожаловать в команду профессионалов!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group" onClick={() => scrollToSection('structure')}>
                  Узнать больше
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('quiz')}>
                  Пройти квиз
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/a77ba134-53b4-4ea5-9c70-adf65b534466/files/3bc69199-d0e4-4047-b4b0-b070152f54ad.jpg"
                alt="Правительство Москвы"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">История</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наша история</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Путь становления современной системы управления столицей
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Calendar" className="text-primary" size={28} />
                  <CardTitle>1991 год</CardTitle>
                </div>
                <CardDescription>Начало современной истории</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Образование нового формата управления городом после становления Российской Федерации. Начало реформ местного самоуправления.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Users" className="text-primary" size={28} />
                  <CardTitle>2000-е годы</CardTitle>
                </div>
                <CardDescription>Развитие и модернизация</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Активное развитие инфраструктуры, внедрение современных технологий управления, создание эффективной системы взаимодействия с жителями.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Sparkles" className="text-primary" size={28} />
                  <CardTitle>2010-е годы</CardTitle>
                </div>
                <CardDescription>Цифровая трансформация</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Запуск масштабных программ цифровизации, внедрение электронных услуг, создание современной городской инфраструктуры.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Rocket" className="text-primary" size={28} />
                  <CardTitle>Сегодня</CardTitle>
                </div>
                <CardDescription>Умный город будущего</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Москва - один из мировых лидеров по внедрению smart-технологий. Мы создаем комфортную среду для жизни миллионов людей.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="structure" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Структура</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Организационная структура</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Современная и эффективная система управления городом
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 shadow-md">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Icon name="Building2" className="text-primary" size={24} />
                  <span className="text-lg font-semibold">Мэр Москвы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Возглавляет исполнительную власть города, определяет стратегические направления развития столицы, координирует работу всех департаментов и ведомств.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 shadow-md">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Icon name="Briefcase" className="text-primary" size={24} />
                  <span className="text-lg font-semibold">Департаменты</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                <div className="space-y-2">
                  <p>Департамент образования и науки города Москвы</p>
                  <p>Департамент здравоохранения города Москвы</p>
                  <p>Департамент транспорта и развития дорожно-транспортной инфраструктуры</p>
                  <p>Департамент экономической политики и развития города Москвы</p>
                  <p>И более 30 других департаментов и комитетов</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 shadow-md">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" className="text-primary" size={24} />
                  <span className="text-lg font-semibold">Префектуры округов</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                12 административных округов Москвы, каждый из которых управляется префектом. Префектуры обеспечивают реализацию городской политики на местном уровне.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 shadow-md">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" className="text-primary" size={24} />
                  <span className="text-lg font-semibold">Контрольные органы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Контрольно-счетная палата Москвы, департамент городского имущества, другие надзорные и контрольные службы обеспечивают прозрачность и эффективность работы.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="mission" className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <Icon name="Target" size={32} />
              </div>
              <h3 className="text-2xl font-bold">Миссия</h3>
              <p className="text-blue-50">
                Создавать комфортную городскую среду, обеспечивая высокое качество жизни каждого москвича
              </p>
            </div>

            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <Icon name="Eye" size={32} />
              </div>
              <h3 className="text-2xl font-bold">Видение</h3>
              <p className="text-blue-50">
                Москва - глобальный лидер среди мегаполисов по уровню комфорта и технологичности
              </p>
            </div>

            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <Icon name="Heart" size={32} />
              </div>
              <h3 className="text-2xl font-bold">Ценности</h3>
              <p className="text-blue-50">
                Профессионализм, открытость, инновации, забота о жителях, ответственность
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Команда</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наша команда</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессионалы, которые делают Москву лучше каждый день
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://cdn.poehali.dev/projects/a77ba134-53b4-4ea5-9c70-adf65b534466/files/9e9954f4-6f1c-41f3-b06e-67bd96036eb2.jpg"
              alt="Команда"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-2">Вместе мы сильнее</h3>
                <p className="text-lg text-gray-200">Более 100,000 сотрудников работают для комфорта москвичей</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Достижения</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ключевые достижения</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Важные вехи развития столицы
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-blue-300 hidden md:block" />

            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1 md:pr-8">
                  <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="secondary" className="text-lg px-4 py-1">{achievement.year}</Badge>
                        <CardTitle>{achievement.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:flex w-12 h-12 bg-primary rounded-full items-center justify-center z-10 shadow-lg">
                  <Icon name="Star" className="text-white" size={24} />
                </div>

                <div className="flex-1 md:pl-8" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quiz" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Квиз</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Проверьте свои знания</h2>
            <p className="text-xl text-gray-600">
              Пройдите небольшой тест о Правительстве Москвы
            </p>
          </div>

          <div className="space-y-8">
            {quizQuestions.map((q) => (
              <Card key={q.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Вопрос {q.id}</CardTitle>
                  <CardDescription className="text-base font-medium text-foreground mt-2">
                    {q.question}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {q.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(q.id, idx)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                          quizAnswers[q.id] === idx
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex flex-col items-center space-y-4">
              <Button
                size="lg"
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                className="px-12"
              >
                Проверить результаты
              </Button>

              {quizScore !== null && (
                <Card className="w-full text-center animate-scale-in">
                  <CardHeader>
                    <CardTitle className="text-2xl">Ваш результат</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-5xl font-bold text-primary">{quizScore}%</div>
                      <Progress value={quizScore} className="h-3" />
                      <p className="text-gray-600">
                        {quizScore === 100
                          ? 'Отлично! Вы прекрасно знаете структуру Правительства Москвы!'
                          : quizScore >= 66
                          ? 'Хороший результат! Продолжайте изучать материалы.'
                          : 'Рекомендуем ещё раз ознакомиться с информацией на портале.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="career" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Карьера</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Развитие карьеры</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Возможности роста и профессионального развития
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <Icon name="GraduationCap" className="text-primary mb-3" size={40} />
                <CardTitle>Обучение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Регулярные тренинги, курсы повышения квалификации и программы профессионального развития
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <Icon name="TrendingUp" className="text-primary mb-3" size={40} />
                <CardTitle>Карьерный рост</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Прозрачная система продвижения, основанная на результатах и профессиональных достижениях
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <Icon name="Award" className="text-primary mb-3" size={40} />
                <CardTitle>Признание</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Система наград, премий и поощрений за выдающиеся достижения в работе
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Присоединяйтесь к нам!</h3>
                <p className="text-gray-600 mb-6">
                  Станьте частью команды, которая меняет жизнь города к лучшему. У нас вы найдете интересные задачи, профессиональное развитие и возможность реализовать себя.
                </p>
                <Button size="lg" className="group">
                  Открытые вакансии
                  <Icon name="ExternalLink" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon name="CheckCircle2" className="text-primary" size={24} />
                  </div>
                  <span className="text-gray-700">Стабильная государственная служба</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon name="CheckCircle2" className="text-primary" size={24} />
                  </div>
                  <span className="text-gray-700">Социальные гарантии и льготы</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon name="CheckCircle2" className="text-primary" size={24} />
                  </div>
                  <span className="text-gray-700">Профессиональное развитие</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Контакты</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-600">
              Мы всегда готовы ответить на ваши вопросы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Icon name="Phone" className="text-primary mx-auto mb-3" size={40} />
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">+7 (495) 777-77-77</p>
                <p className="text-sm text-gray-500 mt-2">Пн-Пт: 9:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Icon name="Mail" className="text-primary mx-auto mb-3" size={40} />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">info@mos.ru</p>
                <p className="text-sm text-gray-500 mt-2">Ответим в течение 24 часов</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Icon name="MapPin" className="text-primary mx-auto mb-3" size={40} />
                <CardTitle>Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Москва, Тверская ул., 13</p>
                <p className="text-sm text-gray-500 mt-2">Центральный офис</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">О нас</h4>
              <ul className="space-y-2 text-blue-50">
                <li><a href="#history" className="hover:text-white transition-colors">История</a></li>
                <li><a href="#structure" className="hover:text-white transition-colors">Структура</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Команда</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Информация</h4>
              <ul className="space-y-2 text-blue-50">
                <li><a href="#mission" className="hover:text-white transition-colors">Миссия</a></li>
                <li><a href="#achievements" className="hover:text-white transition-colors">Достижения</a></li>
                <li><a href="#career" className="hover:text-white transition-colors">Карьера</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Полезное</h4>
              <ul className="space-y-2 text-blue-50">
                <li><a href="#quiz" className="hover:text-white transition-colors">Квиз</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:scale-110 transition-transform">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Icon name="Facebook" size={24} />
                  </div>
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Icon name="Twitter" size={24} />
                  </div>
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Icon name="Instagram" size={24} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-blue-50">
            <p>&copy; 2024 Правительство Москвы. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
