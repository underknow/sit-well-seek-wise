import { useState } from "react";
import { ChevronRight, ChevronLeft, Zap, Target, CheckCircle, Award, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { ProductCardNew } from "@/components/ProductCardNew";
import { useProducts } from "@/hooks/useProducts";

interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{
    id: string;
    text: string;
    icon: React.ReactNode;
    weight: Record<string, number>;
  }>;
}

interface QuizResult {
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  filters: Record<string, any>;
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  
  const { data: products = [] } = useProducts();

  const questions: QuizQuestion[] = [
    {
      id: 0,
      question: "Combien d'heures passez-vous assis par jour ?",
      options: [
        { 
          id: "short", 
          text: "Moins de 4h", 
          icon: <Target className="w-5 h-5" />,
          weight: { comfort: 1, durability: 1, price: 3 }
        },
        { 
          id: "medium", 
          text: "4-8h", 
          icon: <CheckCircle className="w-5 h-5" />,
          weight: { comfort: 2, durability: 2, ergonomics: 2 }
        },
        { 
          id: "long", 
          text: "Plus de 8h", 
          icon: <Award className="w-5 h-5" />,
          weight: { comfort: 3, durability: 3, ergonomics: 3 }
        }
      ]
    },
    {
      id: 1,
      question: "Quel est votre budget approximatif ?",
      options: [
        { 
          id: "budget", 
          text: "Moins de 300€", 
          icon: <Target className="w-5 h-5" />,
          weight: { price: 3, basic: 2 }
        },
        { 
          id: "mid", 
          text: "300-800€", 
          icon: <CheckCircle className="w-5 h-5" />,
          weight: { price: 2, comfort: 1, quality: 2 }
        },
        { 
          id: "premium", 
          text: "Plus de 800€", 
          icon: <Award className="w-5 h-5" />,
          weight: { premium: 3, durability: 2, features: 3 }
        }
      ]
    },
    {
      id: 2,
      question: "Quelle est votre priorité principale ?",
      options: [
        { 
          id: "comfort", 
          text: "Confort maximal", 
          icon: <Sparkles className="w-5 h-5" />,
          weight: { comfort: 3, ergonomics: 2 }
        },
        { 
          id: "health", 
          text: "Santé posturale", 
          icon: <CheckCircle className="w-5 h-5" />,
          weight: { ergonomics: 3, health: 3 }
        },
        { 
          id: "productivity", 
          text: "Productivité", 
          icon: <Target className="w-5 h-5" />,
          weight: { features: 2, efficiency: 3 }
        }
      ]
    },
    {
      id: 3,
      question: "Quel type de mobilier recherchez-vous ?",
      options: [
        { 
          id: "chair", 
          text: "Chaise ergonomique", 
          icon: <Award className="w-5 h-5" />,
          weight: { chair: 3 }
        },
        { 
          id: "desk", 
          text: "Bureau debout", 
          icon: <Target className="w-5 h-5" />,
          weight: { desk: 3 }
        },
        { 
          id: "accessories", 
          text: "Accessoires", 
          icon: <Sparkles className="w-5 h-5" />,
          weight: { accessories: 3 }
        }
      ]
    },
    {
      id: 4,
      question: "Quel est votre environnement de travail ?",
      options: [
        { 
          id: "home", 
          text: "Télétravail à domicile", 
          icon: <CheckCircle className="w-5 h-5" />,
          weight: { home: 2, versatility: 2 }
        },
        { 
          id: "office", 
          text: "Bureau professionnel", 
          icon: <Award className="w-5 h-5" />,
          weight: { professional: 3, durability: 2 }
        },
        { 
          id: "hybrid", 
          text: "Mixte (home + bureau)", 
          icon: <Target className="w-5 h-5" />,
          weight: { versatility: 3, adaptability: 2 }
        }
      ]
    }
  ];

  const results: QuizResult[] = [
    {
      category: "premium-chair",
      title: "Chaise Ergonomique Premium",
      description: "Vous avez besoin d'une chaise haut de gamme avec toutes les fonctionnalités ergonomiques pour un confort optimal durant de longues heures.",
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      filters: { category: "chaises", featured: true }
    },
    {
      category: "standing-desk",
      title: "Bureau Debout Électrique",
      description: "Un bureau debout réglable sera parfait pour alterner entre position assise et debout, idéal pour votre santé posturale.",
      icon: <Target className="w-8 h-8 text-blue-500" />,
      filters: { category: "bureaux", featured: true }
    },
    {
      category: "ergonomic-setup",
      title: "Setup Ergonomique Complet",
      description: "Vous bénéficieriez d'un ensemble d'accessoires ergonomiques pour optimiser votre poste de travail existant.",
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      filters: { category: "accessoires", featured: true }
    }
  ];

  const calculateResult = () => {
    const scores = {
      comfort: 0,
      durability: 0,
      ergonomics: 0,
      price: 0,
      premium: 0,
      chair: 0,
      desk: 0,
      accessories: 0
    };

    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions[parseInt(questionId)];
      const answer = question.options.find(opt => opt.id === answerId);
      if (answer) {
        Object.entries(answer.weight).forEach(([key, value]) => {
          if (key in scores) {
            scores[key as keyof typeof scores] += value;
          }
        });
      }
    });

    // Determine result based on highest scores
    if (scores.chair > scores.desk && scores.chair > scores.accessories) {
      return results[0]; // Premium chair
    } else if (scores.desk > scores.accessories) {
      return results[1]; // Standing desk
    } else {
      return results[2]; // Accessories
    }
  };

  const handleAnswer = (answerId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerId }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const calculatedResult = calculateResult();
      setResult(calculatedResult);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  if (showResults && result) {
    const recommendedProducts = products.filter(product => 
      product.is_featured && product.is_active
    ).slice(0, 3);

    return (
      <>
        <SEOHead
          title="Résultats Quiz Mobilier Ergonomique | Recommendations Personnalisées"
          description="Découvrez vos recommandations personnalisées de mobilier ergonomique basées sur vos réponses au quiz. Trouvez le mobilier parfait pour vos besoins."
          keywords="quiz mobilier ergonomique, recommandations personnalisées, chaise bureau, bureau debout"
          canonicalUrl="/quiz"
        />
        
        <div className="min-h-screen">
          <Navigation />
          
          <div className="container mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-4xl mx-auto">
              {/* Results Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  {result.icon}
                </div>
                
                <Badge className="bg-success/10 text-success mb-4 px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Quiz Terminé !
                </Badge>
                
                <h1 className="text-4xl font-bold mb-4">
                  Votre profil :{" "}
                  <span className="gradient-text">{result.title}</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {result.description}
                </p>
              </div>

              {/* Recommended Products */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Nos recommandations pour vous
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedProducts.map((product, index) => (
                    <div key={product.id} className="relative">
                      {index === 0 && (
                        <Badge className="absolute -top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 z-10">
                          <Award className="w-3 h-3 mr-1" />
                          Recommandé #1
                        </Badge>
                      )}
                      <ProductCardNew product={product} showBuyButton />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={restartQuiz} variant="outline" size="lg">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Refaire le quiz
                  </Button>
                  
                  <Button className="btn-gradient" size="lg">
                    Voir tous les produits recommandés
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Résultats basés sur vos réponses et notre expertise produit
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Quiz Mobilier Ergonomique Personnalisé | Trouvez Votre Mobilier Idéal"
        description="🎯 Quiz personnalisé pour trouver le mobilier ergonomique parfait selon vos besoins. Recommandations d'experts basées sur votre profil et utilisation."
        keywords="quiz mobilier ergonomique, test personnalisé, chaise bureau, bureau debout, recommandations mobilier"
        canonicalUrl="/quiz"
      />
      
      <div className="min-h-screen">
        <Navigation />
        
        <div className="container mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Zap className="w-16 h-16 text-primary animate-pulse" />
                  <Sparkles className="w-6 h-6 text-secondary absolute -top-1 -right-1 animate-bounce" />
                </div>
              </div>
              
              <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                Quiz Personnalisé
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">
                Trouvez votre{" "}
                <span className="gradient-text">mobilier idéal</span>
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Répondez à quelques questions pour recevoir des recommandations personnalisées
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} sur {questions.length}
                </span>
                <span className="text-sm font-medium">
                  {Math.round(progress)}% complété
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 hover:border-primary/50 ${
                        currentAnswer === option.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        currentAnswer === option.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {option.icon}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                size="lg"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="btn-gradient"
                size="lg"
              >
                {currentQuestion === questions.length - 1 ? 'Voir les résultats' : 'Suivant'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;