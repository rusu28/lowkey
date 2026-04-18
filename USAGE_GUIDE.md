# Lowkey AI Contests - Usage Guide

## Quick Start

### For Participants

1. **Browse Competitions**
   - Visit the home page to see latest competitions
   - Click "Explore Competitions" to see all available competitions
   - Use filters to find competitions by difficulty or status

2. **Sign Up**
   - Click "Sign Up" in the header
   - Fill in your details
   - Accept terms and conditions
   - You'll be redirected to the competitions page

3. **Join a Competition**
   - Click on any competition to see details
   - Read the problem statement, rules, and evaluation metrics
   - Click "Join Competition" to participate
   - Note: Problems are only visible after the competition starts

4. **View Solutions**
   - After signing in, navigate to the "Editorial" tab
   - Learn from winning solutions and approaches
   - Study the code examples and explanations

### For Organizers

1. **Get Organizer Access**
   - Sign up with an email containing "organizer"
   - Example: `organizer@example.com` or `john.organizer@gmail.com`
   - You'll automatically get organizer permissions

2. **Create a Competition**
   - Click "Add Competition" in the header (only visible to organizers)
   - Fill in the 4-section form:

   **Section 1: Basic Info**
   - Competition title
   - Short description (for list page)
   - Full description (supports Markdown + LaTeX)
   - Difficulty level
   - Start and end dates
   - Prize information
   - Tags (comma-separated)
   - Optional background image URL

   **Section 2: Problems**
   - Click "Add Problem" to create problems
   - Each problem has:
     - Title
     - Content (Markdown/LaTeX)
     - Optional subtasks with points
   - You can add as many problems as needed
   - Remove problems with the trash icon

   **Section 3: Rules & Metrics**
   - Modify predefined rules or add custom ones
   - Define evaluation metrics with LaTeX formulas
   - Example metrics: RMSE, Accuracy, F1 Score

   **Section 4: Additional Content**
   - Add announcements for participants
   - Write editorial with winning solutions
   - Both support Markdown/LaTeX

3. **Preview Before Publishing**
   - Switch to the "Preview" tab to see how it looks
   - Review all sections
   - Go back and edit if needed

4. **Publish**
   - Click "Create Competition"
   - Competition will appear in the list
   - Status is automatically set based on dates

## Writing Content with LaTeX

### Basic Markdown
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

`inline code`

\`\`\`python
# Code block
def hello():
    print("Hello!")
\`\`\`
```

### LaTeX Formulas

**Inline Math** - Use single dollar signs:
```markdown
The equation $E = mc^2$ shows energy-mass equivalence.
```

**Block Math** - Use double dollar signs:
```markdown
$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$
```

**Common Formulas:**

Mean Squared Error:
```latex
$$
MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$
```

Accuracy:
```latex
$$
\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}
$$
```

Summation:
```latex
$$
\sum_{i=1}^{n} x_i
$$
```

Fractions:
```latex
$$
\frac{numerator}{denominator}
$$
```

Square Root:
```latex
$$
\sqrt{x}
$$
```

### Tables in Markdown

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

## Competition Status Flow

### Upcoming Competition
- Status badge shows "UPCOMING"
- Only description, rules, and announcements are visible
- Problems are locked with a message showing start date
- Users can register but can't see problems yet

### Ongoing Competition
- Status badge shows "ONGOING"
- All content is visible to signed-in users
- Problems are accessible
- Users can join and participate
- Leaderboard updates (future feature)

### Ended Competition
- Status badge shows "ENDED"
- All content including editorial is visible
- Final rankings shown
- No new submissions accepted

## Tips for Organizers

### Writing Good Problem Statements

1. **Start with an overview**
   ```markdown
   # Problem: Predict House Prices
   
   In this problem, you'll build a model to predict...
   ```

2. **Describe the dataset**
   ```markdown
   ## Dataset
   
   The dataset contains 79 features describing...
   
   | Feature | Description |
   |---------|-------------|
   | OverallQual | Quality rating 1-10 |
   ```

3. **Define metrics clearly**
   ```markdown
   ## Evaluation
   
   Submissions are evaluated using RMSE:
   
   $$
   RMSE = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}
   $$
   ```

4. **Provide examples**
   ```markdown
   ## Example
   
   Input:
   \`\`\`
   feature1: 1500
   feature2: 3
   \`\`\`
   
   Expected Output:
   \`\`\`
   250000
   \`\`\`
   ```

### Best Practices

- ✅ Use clear, concise language
- ✅ Include formulas for all metrics
- ✅ Provide dataset descriptions
- ✅ Add examples and test cases
- ✅ Set reasonable deadlines
- ✅ Update announcements regularly
- ✅ Publish editorial after competition ends
- ✅ Use subtasks for progressive difficulty
- ✅ Tag competitions appropriately
- ❌ Don't make problems too vague
- ❌ Don't forget to define evaluation metrics
- ❌ Don't start competitions without testing

## Dark Mode

- Click the moon/sun icon in the header to toggle
- Preference is saved automatically
- All content adapts to dark mode
- LaTeX formulas render correctly in both modes

## Contact & Support

- Use the Contact page to reach out
- Report issues or suggest features
- Join the community on Discord (link in Contact page)

## Example Competition Structure

Here's a template for a complete competition:

**Title:** "Image Classification Basics"

**Short Description:**
"Learn to classify images using convolutional neural networks"

**Full Description:**
```markdown
# Image Classification Challenge

Build a CNN model to classify images across 10 categories.

## Overview

Computer vision is crucial for modern AI applications...

## Goal

Achieve >90% accuracy on the test set.
```

**Problem 1:**
```markdown
# Classification Task

## Dataset

- 50,000 training images (32x32 RGB)
- 10,000 test images
- 10 classes: cat, dog, bird...

## Metric

$$
\text{Accuracy} = \frac{\text{Correct Predictions}}{\text{Total Predictions}}
$$

## Submission Format

CSV with two columns:
- `id`: Image ID
- `label`: Predicted class (0-9)
```

**Rules:**
- Team Size: Maximum 3 members
- Submissions: 5 per day
- External Data: Pre-trained models allowed

**Metrics:**
```markdown
## Evaluation

Primary: Classification Accuracy

$$
\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}
$$

Leaderboard: Public (50%) + Private (50%)
```

Happy competing! 🏆
