import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (entry.target.id === 'stats') {
              setStatsVisible(true);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const departments = [
    {
      id: 1,
      name: 'Мэр Москвы',
      icon: 'Crown',
      color: 'bg-red-500',
      description: 'Возглавляет исполнительную власть города',
      details: 'Определяет стратегические направления развития столицы, координирует работу всех департаментов и ведомств, представляет город на федеральном и международном уровне.',
      staff: '50+ сотрудников'
    },
    {
      id: 2,
      name: 'Образование',
      icon: 'GraduationCap',
      color: 'bg-red-400',
      description: 'Департамент образования и науки',
      details: 'Управление системой дошкольного, школьного и дополнительного образования. Более 3000 образовательных учреждений.',
      staff: '15,000+ сотрудников'
    },
    {
      id: 3,
      name: 'Здравоохранение',
      icon: 'Heart',
      color: 'bg-red-400',
      description: 'Департамент здравоохранения',
      details: 'Организация медицинской помощи жителям Москвы. Управление городскими больницами, поликлиниками и медицинскими центрами.',
      staff: '120,000+ сотрудников'
    },
    {
      id: 4,
      name: 'Транспорт',
      icon: 'Bus',
      color: 'bg-red-400',
      description: 'Департамент транспорта',
      details: 'Развитие транспортной инфраструктуры, управление метрополитеном, наземным транспортом, координация дорожного движения.',
      staff: '80,000+ сотрудников'
    },
    {
      id: 5,
      name: 'Экономика',
      icon: 'TrendingUp',
      color: 'bg-red-400',
      description: 'Департамент экономики',
      details: 'Разработка и реализация экономической политики города, поддержка бизнеса, инвестиционные проекты.',
      staff: '2,000+ сотрудников'
    },
    {
      id: 6,
      name: 'Культура',
      icon: 'Theater',
      color: 'bg-red-400',
      description: 'Департамент культуры',
      details: 'Управление учреждениями культуры, организация культурных мероприятий, сохранение культурного наследия.',
      staff: '25,000+ сотрудников'
    },
    {
      id: 7,
      name: 'Префектуры',
      icon: 'MapPin',
      color: 'bg-red-300',
      description: '12 административных округов',
      details: 'Префектуры обеспечивают реализацию городской политики на местном уровне в каждом из 12 округов Москвы.',
      staff: '30,000+ сотрудников'
    },
    {
      id: 8,
      name: 'ЖКХ',
      icon: 'Home',
      color: 'bg-red-300',
      description: 'Жилищно-коммунальное хозяйство',
      details: 'Управление жилищным фондом, благоустройство территорий, коммунальные услуги, капитальный ремонт.',
      staff: '50,000+ сотрудников'
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'В каком году было образовано Правительство Москвы?',
      options: ['1991', '1993', '1995', '2000'],
      correct: 1
    },
    {
      id: 2,
      question: 'Сколько административных округов в Москве?',
      options: ['8', '10', '12', '15'],
      correct: 2
    },
    {
      id: 3,
      question: 'Какая система управления используется?',
      options: ['Централизованная', 'Смешанная', 'Децентрализованная', 'Федеративная'],
      correct: 1
    }
  ];

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = { ...quizAnswers, [currentQuestion.id]: answerIndex };
    setQuizAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        let correct = 0;
        quizQuestions.forEach((q) => {
          if (newAnswers[q.id] === q.correct) correct++;
        });
        setQuizScore(Math.round((correct / quizQuestions.length) * 100));
        setShowQuizResult(true);
      }
    }, 400);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizScore(null);
    setCurrentQuestionIndex(0);
    setShowQuizResult(false);
  };

  const stats = [
    { value: '100K+', label: 'Сотрудников', icon: 'Users' },
    { value: '40+', label: 'Департаментов', icon: 'Building2' },
    { value: '12.5M', label: 'Жителей', icon: 'UserCheck' },
    { value: '1991', label: 'Год основания', icon: 'Calendar' }
  ];

  const timeline = [
    { year: '1991', title: 'Основание', description: 'Создание современной системы управления', icon: 'Rocket' },
    { year: '2010', title: 'Цифровизация', description: 'Запуск электронных госуслуг', icon: 'Smartphone' },
    { year: '2019', title: 'Умный город', description: 'Внедрение AI и IoT технологий', icon: 'Zap' },
    { year: '2024', title: 'Инновации', description: 'Лидер цифровой трансформации', icon: 'Sparkles' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="fixed top-0 w-full bg-white/98 backdrop-blur-md shadow-lg z-50 border-b-2 border-red-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Icon name="Building2" className="text-red-600 animate-pulse-glow" size={36} />
                <div className="absolute inset-0 bg-red-500 blur-xl opacity-30 animate-pulse-glow"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                Правительство Москвы
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Главная', 'Статистика', 'Структура', 'История', 'Квиз', 'Карьера'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['hero', 'stats', 'structure', 'timeline', 'quiz', 'career'][index])}
                  className={`relative text-sm font-semibold transition-all duration-300 group ${
                    activeSection === ['hero', 'stats', 'structure', 'timeline', 'quiz', 'career'][index]
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                    activeSection === ['hero', 'stats', 'structure', 'timeline', 'quiz', 'career'][index]
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <Badge className="text-base px-6 py-2 bg-red-100 text-red-700 border-red-300 hover:bg-red-200 transition-all animate-bounce-in">
                ✨ Добро пожаловать в команду
              </Badge>
              <h1 className="text-6xl md:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  Правительство
                </span>
                <br />
                <span className="text-gray-900">Москвы</span>
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                Создаём умный мегаполис будущего. Присоединяйтесь к команде профессионалов!
              </p>
              <div className="flex flex-wrap gap-6">
                <Button size="lg" className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Начать путь
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-red-600 text-red-600 hover:bg-red-50 shadow-lg" onClick={() => scrollToSection('quiz')}>
                  Пройти квиз 🎯
                </Button>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl blur-2xl opacity-20 animate-pulse-glow"></div>
              <img
                src="https://cdn.poehali.dev/projects/a77ba134-53b4-4ea5-9c70-adf65b534466/files/7e3d5461-9000-4c7e-b7e7-d4963bf5d412.jpg"
                alt="Москва"
                className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover border-4 border-white transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <Icon name="TrendingUp" className="text-red-600" size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">12.5M</p>
                    <p className="text-gray-600 font-medium">Жителей</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-24 px-4 bg-gradient-to-br from-red-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 animate-fade-in">
              Москва в цифрах
            </h2>
            <p className="text-2xl text-red-100 animate-fade-in">Лидер среди мегаполисов мира</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                    <Icon name={stat.icon as any} className="text-white" size={40} />
                  </div>
                  <p className={`text-5xl font-black text-white mb-2 ${statsVisible ? 'animate-bounce-in' : 'opacity-0'}`}>
                    {stat.value}
                  </p>
                  <p className="text-xl text-red-100 font-semibold">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="structure" className="py-24 px-4 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-3 bg-red-100 text-red-700 border-red-300">
              🏛️ Организация
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Структура управления
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Кликните на любой департамент, чтобы узнать подробности
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {departments.slice(0, 1).map((dept, index) => (
                <div key={dept.id} className="md:col-span-4 flex justify-center">
                  <Card
                    onClick={() => setSelectedDepartment(dept)}
                    className={`${dept.color} border-none text-white cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl w-full md:w-1/2 animate-bounce-in group`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="text-center pb-8">
                      <div className="bg-white/20 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                        <Icon name={dept.icon as any} size={48} />
                      </div>
                      <CardTitle className="text-3xl font-black">{dept.name}</CardTitle>
                      <CardDescription className="text-white/90 text-lg mt-2">{dept.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {departments.slice(1).map((dept, index) => (
                <Card
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`${dept.color} border-none text-white cursor-pointer transform hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                      <Icon name={dept.icon as any} size={32} />
                    </div>
                    <CardTitle className="text-xl font-bold">{dept.name}</CardTitle>
                    <CardDescription className="text-white/80 text-sm mt-2">{dept.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
        <DialogContent className="max-w-2xl animate-scale-in">
          <DialogHeader>
            <div className={`${selectedDepartment?.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-4 animate-bounce-in`}>
              <Icon name={selectedDepartment?.icon as any} className="text-white" size={40} />
            </div>
            <DialogTitle className="text-3xl font-black">{selectedDepartment?.name}</DialogTitle>
            <DialogDescription className="text-lg text-gray-600 mt-4">
              {selectedDepartment?.details}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="Users" className="text-red-600" size={28} />
                  <span className="text-lg font-semibold text-gray-900">Численность:</span>
                </div>
                <span className="text-2xl font-bold text-red-600">{selectedDepartment?.staff}</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-lg py-6" onClick={() => setSelectedDepartment(null)}>
              Понятно!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <section id="timeline" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-3 bg-red-100 text-red-700 border-red-300">
              ⏳ Эволюция
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              История развития
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-600 via-red-400 to-red-300 hidden md:block"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-red-100 hover:border-red-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-br from-red-600 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                        <Icon name={item.icon as any} className="text-white" size={32} />
                      </div>
                      <Badge className="text-2xl px-6 py-2 bg-red-600 text-white font-black">{item.year}</Badge>
                    </div>
                    <CardTitle className="text-2xl font-black">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>

                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full items-center justify-center shadow-xl animate-pulse-glow"
                  style={{ [index % 2 === 0 ? 'right' : 'left']: '-1rem' }}>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quiz" className="py-24 px-4 bg-gradient-to-br from-red-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-3 bg-red-100 text-red-700 border-red-300">
              🎯 Проверка знаний
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Интерактивный квиз
            </h2>
            <p className="text-2xl text-gray-600">Насколько хорошо вы знаете Правительство Москвы?</p>
          </div>

          {!showQuizResult ? (
            <Card className="shadow-2xl border-2 border-red-100 overflow-hidden animate-scale-in">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
                <div className="flex items-center justify-between text-white mb-4">
                  <span className="text-lg font-semibold">Вопрос {currentQuestionIndex + 1} из {quizQuestions.length}</span>
                  <Icon name="HelpCircle" size={28} />
                </div>
                <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="h-3 bg-white/30" />
              </div>
              
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-8 text-gray-900">{currentQuestion.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className="group relative p-6 rounded-2xl border-3 border-gray-200 hover:border-red-500 bg-white hover:bg-red-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-red-100 group-hover:bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-red-600 group-hover:text-white transition-all text-xl">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-2xl border-2 border-red-100 text-center animate-bounce-in">
              <CardContent className="p-12">
                <div className="mb-8">
                  {quizScore === 100 ? (
                    <div className="text-8xl mb-4 animate-wiggle">🏆</div>
                  ) : quizScore >= 66 ? (
                    <div className="text-8xl mb-4 animate-bounce-in">🎉</div>
                  ) : (
                    <div className="text-8xl mb-4">📚</div>
                  )}
                </div>
                
                <h3 className="text-4xl font-black mb-6 text-gray-900">Результаты</h3>
                <div className="mb-8">
                  <div className="text-7xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
                    {quizScore}%
                  </div>
                  <Progress value={quizScore!} className="h-4 mb-6" />
                  <p className="text-xl text-gray-600">
                    {quizScore === 100
                      ? 'Невероятно! Вы эксперт по структуре Правительства Москвы! 🌟'
                      : quizScore >= 66
                      ? 'Отличный результат! Вы хорошо разбираетесь в теме! 💪'
                      : 'Хороший старт! Изучите материалы подробнее. 📖'}
                  </p>
                </div>
                
                <Button
                  size="lg"
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-lg px-12 py-6"
                >
                  Пройти ещё раз 🔄
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section id="career" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-3 bg-red-100 text-red-700 border-red-300">
              💼 Карьера
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Присоединяйтесь к команде
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Станьте частью команды, которая создаёт будущее Москвы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: 'Rocket', title: 'Амбициозные проекты', desc: 'Работайте над проектами мирового уровня' },
              { icon: 'Users', title: 'Команда экспертов', desc: 'Учитесь у лучших профессионалов' },
              { icon: 'Award', title: 'Признание', desc: 'Ваши достижения будут оценены по достоинству' }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-red-100 hover:border-red-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-br from-red-600 to-red-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform shadow-lg">
                    <Icon name={item.icon as any} className="text-white" size={40} />
                  </div>
                  <CardTitle className="text-2xl font-black mb-3">{item.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-600">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-12 text-white text-center shadow-2xl animate-scale-in">
            <h3 className="text-4xl font-black mb-6">Готовы начать?</h3>
            <p className="text-2xl mb-8 text-red-100">Откройте для себя возможности карьерного роста в Правительстве Москвы</p>
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-xl px-12 py-7 shadow-xl transform hover:scale-110 transition-all">
              Смотреть вакансии
              <Icon name="ArrowRight" className="ml-3" size={24} />
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="Building2" size={40} className="text-red-500" />
                <span className="text-2xl font-bold">Правительство Москвы</span>
              </div>
              <p className="text-gray-400 text-lg mb-6">
                Создаём современный мегаполис для комфортной жизни каждого москвича
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((social) => (
                  <a key={social} href="#" className="bg-gray-800 hover:bg-red-600 p-3 rounded-xl transition-all transform hover:scale-110">
                    <Icon name={social as any} size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-6">Разделы</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#stats" className="hover:text-red-500 transition-colors text-lg">Статистика</a></li>
                <li><a href="#structure" className="hover:text-red-500 transition-colors text-lg">Структура</a></li>
                <li><a href="#timeline" className="hover:text-red-500 transition-colors text-lg">История</a></li>
                <li><a href="#quiz" className="hover:text-red-500 transition-colors text-lg">Квиз</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-6">Контакты</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-red-500" />
                  <span className="text-lg">+7 (495) 777-77-77</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-red-500" />
                  <span className="text-lg">info@mos.ru</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-red-500" />
                  <span className="text-lg">Тверская ул., 13</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-lg">&copy; 2024 Правительство Москвы. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
