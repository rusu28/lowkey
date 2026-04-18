export interface Problem {
  id: number;
  title: string;
  content: string; // Markdown/LaTeX content
  editorial?: string; // Editorial/solution explanation
  subtasks?: {
    id: number;
    name: string;
    points: number;
    description: string;
  }[];
}

export interface Team {
  id: number;
  name: string;
  members: {
    userId: string;
    username: string;
    avatar?: string;
    role: "leader" | "member";
  }[];
  score?: number;
  rank?: number;
}

export interface TeamInvite {
  id: number;
  teamId: number;
  teamName: string;
  fromUserId: string;
  fromUsername: string;
  toUserId: string;
  competitionId: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Competition {
  id: number;
  title: string;
  shortDescription: string; // For list page
  fullDescription: string; // For detail page, supports markdown/latex
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  participants: number;
  startDate: string;
  endDate: string;
  duration?: string; // e.g., "2 weeks"
  status: "upcoming" | "ongoing" | "ended";
  problems: Problem[];
  rules: string; // Markdown/LaTeX content
  metrics: string; // Markdown/LaTeX content
  announcements: {
    id: number;
    date: string;
    title: string;
    content: string;
  }[];
  editorial?: string; // Markdown/LaTeX content
  tags: string[];
  prize: string;
  backgroundImage?: string;
  logo?: string;
  organizerNotes?: string; // Additional details from organizer
  isTeamCompetition: boolean;
  minTeamSize: number;
  maxTeamSize: number;
  teams?: Team[];
}

export const competitions: Competition[] = [
  {
    id: 1,
    title: "House Prices Prediction Challenge",
    shortDescription: "Predict house prices using advanced regression techniques and feature engineering.",
    fullDescription: `# House Prices Prediction

Ask a home buyer to describe their dream house, and they probably won't begin with the height of the basement ceiling or the proximity to an east-west railroad. But this competition's dataset proves that much more influences price negotiations than the number of bedrooms or a white-picket fence.

With **79 explanatory variables** describing (almost) every aspect of residential homes in Ames, Iowa, this competition challenges you to predict the final price of each home.

## Competition Goal

The goal is to predict the sales price for each house in the test set.`,
    difficulty: "Beginner",
    participants: 4523,
    startDate: "2026-04-01",
    endDate: "2026-05-15",
    duration: "6 weeks",
    status: "ongoing",
    problems: [
      {
        id: 1,
        title: "Problem Statement",
        content: `# Task

For each Id in the test set, you must predict the value of the **SalePrice** variable.

## Dataset Description

- **Train.csv**: Training set with SalePrice values
- **Test.csv**: Test set without SalePrice values
- **Data_description.txt**: Full description of each column

### Key Features

Some important features in the dataset:

$$
\\text{TotalSF} = \\text{TotalBsmtSF} + \\text{1stFlrSF} + \\text{2ndFlrSF}
$$

- **OverallQual**: Overall material and finish quality (1-10)
- **GrLivArea**: Above ground living area (sq ft)
- **YearBuilt**: Original construction date
- **Neighborhood**: Physical locations within Ames

## Submission Format

Submit a CSV file with exactly 2 columns:
- \`Id\`: Test set IDs
- \`SalePrice\`: Predicted values

\`\`\`csv
Id,SalePrice
1461,169000.1
1462,187724.1233
...
\`\`\``,
        editorial: `# Editorial: House Prices Prediction

## Approach Overview

The winning solutions typically used a combination of feature engineering and ensemble modeling. Here's a comprehensive breakdown:

## 1. Data Preprocessing

### Handling Missing Values
\`\`\`python
# Fill missing values based on data description
data['PoolQC'].fillna('None', inplace=True)
data['LotFrontage'].fillna(data['LotFrontage'].median(), inplace=True)
\`\`\`

### Outlier Removal
Remove extreme outliers that don't follow the general trend:
\`\`\`python
data = data[data['GrLivArea'] < 4000]
\`\`\`

## 2. Feature Engineering

### Creating New Features
The most important engineered features:

$$
\\text{TotalSF} = \\text{TotalBsmtSF} + \\text{1stFlrSF} + \\text{2ndFlrSF}
$$

$$
\\text{Total Bathrooms} = \\text{FullBath} + 0.5 \\times \\text{HalfBath} + \\text{BsmtFullBath} + 0.5 \\times \\text{BsmtHalfBath}
$$

### Log Transformation
Apply log transformation to skewed features:
\`\`\`python
numeric_feats = data.dtypes[data.dtypes != "object"].index
skewed_feats = data[numeric_feats].apply(lambda x: x.skew())
skewed_feats = skewed_feats[skewed_feats > 0.75]
data[skewed_feats.index] = np.log1p(data[skewed_feats.index])
\`\`\`

## 3. Model Selection

### Best Performing Models

1. **XGBoost**: Excellent performance with default parameters
2. **LightGBM**: Faster training, similar accuracy
3. **Ridge Regression**: Strong baseline with regularization
4. **Lasso Regression**: Good for feature selection

### Ensemble Strategy

The winning approach used stacked generalization:

$$
\\text{Final Prediction} = 0.4 \\times \\text{XGBoost} + 0.3 \\times \\text{LightGBM} + 0.3 \\times \\text{Ridge}
$$

## 4. Hyperparameter Tuning

Key hyperparameters for XGBoost:
\`\`\`python
params = {
    'n_estimators': 2000,
    'learning_rate': 0.01,
    'max_depth': 3,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'reg_alpha': 0.1,
    'reg_lambda': 1.0
}
\`\`\`

## 5. Cross-Validation

Use K-Fold cross-validation with K=5 to ensure robust performance:
\`\`\`python
from sklearn.model_selection import KFold
kf = KFold(n_splits=5, shuffle=True, random_state=42)
\`\`\`

## Key Insights

1. **OverallQual** and **GrLivArea** are the strongest predictors
2. Feature engineering provides 2-3% improvement
3. Ensemble methods reduce overfitting
4. Log transformation of target variable improves RMSE
5. Careful handling of categorical variables is crucial

## Final RMSE

Top solutions achieved RMSE of **0.11-0.12** on the private leaderboard.`,
        subtasks: [
          {
            id: 1,
            name: "Basic Prediction",
            points: 50,
            description: "Create a baseline model using simple features",
          },
          {
            id: 2,
            name: "Feature Engineering",
            points: 30,
            description: "Engineer new features from existing ones",
          },
          {
            id: 3,
            name: "Advanced Model",
            points: 20,
            description: "Use ensemble methods for best performance",
          },
        ],
      },
    ],
    rules: `# Competition Rules

1. **Team Size**: You may compete individually or in teams of up to 5 members
2. **Submissions**: Maximum 5 submissions per day
3. **External Data**: No external data allowed
4. **Code Sharing**: You may share code, but not predictions
5. **Final Submission**: Select up to 2 final submissions before the deadline

## Evaluation Metric

Submissions are evaluated on **Root-Mean-Squared-Error (RMSE)** between the logarithm of the predicted value and the logarithm of the observed sales price:

$$
\\text{RMSE} = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(\\log(\\hat{y}_i) - \\log(y_i))^2}
$$

Where:
- $\\hat{y}_i$ is the predicted price
- $y_i$ is the actual price
- $n$ is the number of instances`,
    metrics: `# Evaluation Metrics

## Primary Metric: RMSE (Log Scale)

The main metric is Root Mean Squared Error on log-transformed prices:

$$
\\text{RMSE}_{\\log} = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(\\log(\\hat{y}_i + 1) - \\log(y_i + 1))^2}
$$

## Leaderboard

- **Public Leaderboard**: 50% of test data (visible during competition)
- **Private Leaderboard**: 50% of test data (revealed after deadline)

Your final ranking is based on the **Private Leaderboard** score.`,
    announcements: [
      {
        id: 1,
        date: "2026-04-09",
        title: "Competition Launch!",
        content: "Welcome to the House Prices Prediction Challenge! Good luck to all participants.",
      },
      {
        id: 2,
        date: "2026-04-05",
        title: "Dataset Updated",
        content: "We've fixed some missing values in the dataset. Please re-download if you downloaded before April 5.",
      },
    ],
    editorial: `# Winning Solution

## Overview

This solution achieved an RMSE of **0.11234** using an ensemble of gradient boosting models.

## Feature Engineering

### 1. Total Square Footage

Combined multiple area features:

$$
\\text{TotalSF} = \\text{TotalBsmtSF} + \\text{1stFlrSF} + \\text{2ndFlrSF}
$$

### 2. Age Features

$$
\\text{HouseAge} = \\text{YrSold} - \\text{YearBuilt}
$$

$$
\\text{RemodAge} = \\text{YrSold} - \\text{YearRemodAdd}
$$

### 3. Categorical Encoding

- **Target Encoding** for high-cardinality features (Neighborhood)
- **One-Hot Encoding** for low-cardinality features

## Model Architecture

Used a weighted ensemble:

\`\`\`python
final_prediction = 0.4 * xgb_pred + 0.3 * lgb_pred + 0.3 * cat_pred
\`\`\`

### Hyperparameters

**XGBoost:**
\`\`\`python
params = {
    'learning_rate': 0.01,
    'max_depth': 5,
    'n_estimators': 3000,
    'subsample': 0.8,
    'colsample_bytree': 0.8
}
\`\`\`

## Key Insights

1. **OverallQual** was the most important feature
2. Log transformation of target reduced heteroscedasticity
3. Cross-validation (5-fold) was crucial for avoiding overfitting`,
    tags: ["Regression", "Feature Engineering", "Ensemble"],
    prize: "Knowledge",
    isTeamCompetition: true,
    minTeamSize: 1,
    maxTeamSize: 5,
  },
  {
    id: 2,
    title: "Multi-Problem AI Marathon",
    shortDescription: "Advanced competition with 3 different ML problems to solve.",
    fullDescription: `# Multi-Problem AI Marathon

This is an advanced competition featuring **3 distinct machine learning problems**. Participants must solve all three problems, and the final score is the average performance across all problems.

## Why Multi-Problem?

Real-world data science requires versatility. This competition tests your ability to:
- Switch between different problem types
- Apply appropriate techniques for each domain
- Manage time effectively across multiple tasks`,
    difficulty: "Advanced",
    participants: 892,
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    duration: "4 weeks",
    status: "upcoming",
    problems: [
      {
        id: 1,
        title: "Problem 1: Image Classification",
        content: `# Image Classification Task

Classify images of handwritten digits (0-9) with high accuracy.

## Dataset

- **Training**: 60,000 images (28x28 grayscale)
- **Test**: 10,000 images

## Metric

$$
\\text{Accuracy} = \\frac{\\text{Correct Predictions}}{\\text{Total Predictions}}
$$

Target: > 99% accuracy`,
      },
      {
        id: 2,
        title: "Problem 2: Time Series Forecasting",
        content: `# Time Series Forecasting

Predict future sales for the next 30 days.

## Data

- 2 years of daily sales data
- Multiple product categories
- Holiday indicators

## Metric

$$
\\text{MAPE} = \\frac{100}{n}\\sum_{i=1}^{n}\\left|\\frac{y_i - \\hat{y}_i}{y_i}\\right|
$$`,
      },
      {
        id: 3,
        title: "Problem 3: NLP Sentiment Analysis",
        content: `# Sentiment Analysis

Classify movie reviews as positive or negative.

## Dataset

- 25,000 labeled reviews for training
- 10,000 reviews for testing

## Metric

$$
\\text{F1 Score} = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}
$$`,
      },
    ],
    rules: `# Competition Rules

1. **Participation**: Individual only (no teams)
2. **Submissions**: 3 separate submissions (one per problem)
3. **Time Limit**: Competition starts June 1 and ends June 30
4. **Offline Evaluation**: Final evaluation on private test set

## Scoring

Final score is the average normalized score across all 3 problems:

$$
\\text{Final Score} = \\frac{1}{3}(S_1 + S_2 + S_3)
$$

Where each $S_i$ is normalized to 0-100 scale.`,
    metrics: `# Scoring System

Each problem is scored independently:

- **Problem 1**: Accuracy (0-100)
- **Problem 2**: 100 - MAPE
- **Problem 3**: F1 Score × 100

Your overall rank is determined by the average score across all three problems.`,
    announcements: [
      {
        id: 1,
        date: "2026-05-15",
        title: "Registration Open",
        content: "Registration is now open! Competition starts June 1.",
      },
    ],
    tags: ["Multi-Problem", "Advanced", "Marathon"],
    prize: "$10,000",
    backgroundImage: "https://images.unsplash.com/photo-1759661990336-51bd4b951fea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBhbGdvcml0aG0lMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3NTY1NDExN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    isTeamCompetition: false,
    minTeamSize: 1,
    maxTeamSize: 1,
  },
  {
    id: 3,
    title: "Titanic: Machine Learning from Disaster",
    shortDescription: "Classic ML problem: predict survival on the Titanic.",
    fullDescription: `# Titanic Survival Prediction

The sinking of the Titanic is one of the most infamous shipwrecks in history. This beginner-friendly competition asks you to build a predictive model that answers the question: "what sorts of people were more likely to survive?" using passenger data.`,
    difficulty: "Beginner",
    participants: 8934,
    startDate: "2020-01-01",
    endDate: "2030-12-31",
    duration: "Ongoing",
    status: "ongoing",
    problems: [
      {
        id: 1,
        title: "Survival Prediction",
        content: `# Task

Predict which passengers survived the Titanic shipwreck.

## Variable Descriptions

| Variable | Definition | Key |
|----------|------------|-----|
| survival | Survival | 0 = No, 1 = Yes |
| pclass | Ticket class | 1 = 1st, 2 = 2nd, 3 = 3rd |
| sex | Sex | |
| age | Age in years | |
| sibsp | # of siblings/spouses aboard | |
| parch | # of parents/children aboard | |
| fare | Passenger fare | |
| embarked | Port of Embarkation | C/Q/S |

## Evaluation

Accuracy: percentage of passengers correctly predicted

$$
\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}
$$`,
      },
    ],
    rules: `# Rules

- This is a **knowledge competition** - no prizes, just learning
- You can use any programming language or tools
- Submissions are evaluated on classification accuracy
- No limit on number of submissions`,
    metrics: `# Metric

**Classification Accuracy**

$$
\\text{Accuracy} = \\frac{\\text{Number of Correct Predictions}}{\\text{Total Number of Predictions}}
$$`,
    announcements: [],
    editorial: `# Solution Approach

## Key Insights

1. **Gender**: Women had 74% survival rate vs 19% for men
2. **Class**: 1st class passengers had highest survival rate (63%)
3. **Age**: Children survived more than adults
4. **Family Size**: Passengers with 2-4 family members survived more

## Feature Engineering

\`\`\`python
# Extract title from name
df['Title'] = df['Name'].str.extract(' ([A-Za-z]+)\\.', expand=False)

# Create family size
df['FamilySize'] = df['SibSp'] + df['Parch'] + 1

# Age groups
df['AgeGroup'] = pd.cut(df['Age'], bins=[0, 12, 18, 60, 100])
\`\`\`

## Model

Random Forest with 100 estimators achieved 82% accuracy.`,
    tags: ["Classification", "Beginner Friendly"],
    prize: "Knowledge",
    isTeamCompetition: false,
    minTeamSize: 1,
    maxTeamSize: 1,
  },
];