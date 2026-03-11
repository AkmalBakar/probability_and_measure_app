---
level: 1
title: "Discrete Probability Recap"
notes: 1
prerequisites: []
---

# Level 1: Discrete Probability Recap

## Reading

This level recaps the basic objects of probability theory in the discrete (finite) setting. If you've taken a first probability course, most of this will be familiar — but pay close attention to the *notation* and the role of the event space $\mathcal{F}$, because later we'll see that $\mathcal{F}$ becomes the main character when we move to infinite sample spaces.

### The probability space

A probability space $(\Omega, \mathcal{F}, \mathbb{P})$ consists of three things:

- A **sample space** $\Omega$ — the set of all outcomes ("all the things that can happen").
- An **event space** $\mathcal{F}$ — a collection of subsets of $\Omega$. These are the events we're allowed to ask about.
- A **probability function** $\mathbb{P} : \mathcal{F} \to [0, 1]$ — this assigns a probability to each event.

In a first course, we usually take $\mathcal{F} = \mathcal{P}(\Omega)$ (the power set, i.e., *all* subsets of $\Omega$). This works fine when $\Omega$ is finite or countable, but will break down for uncountable spaces — that's the whole reason we'll need measure theory later.

**Example (fair die).** Roll a fair six-sided die: $\Omega = \{1,2,3,4,5,6\}$, $\mathcal{F} = \mathcal{P}(\Omega)$, and $\mathbb{P}(X) = \frac{1}{6}|X|$ for all $X \in \mathcal{F}$.

**Example (fair coin, five tosses).** Five fair coin tosses: $\Omega = \{H, T\}^5$, $\mathcal{F} = \mathcal{P}(\Omega)$, $\mathbb{P}(X) = \frac{1}{32}|X|$. This is a *product probability space* — the sample space is a Cartesian product and the probability function is a product of single-toss probabilities.

**Example (unfair coin).** If a coin lands heads with probability $p \in [0,1]$, then for a single toss $\mathbb{P}(H) = p$ and $\mathbb{P}(T) = 1 - p$. For five tosses, if $X = \{x\}$ is a singleton with $s$ heads, then $\mathbb{P}(X) = p^s(1-p)^{5-s}$.

### The event space represents information

The event space doesn't have to be $\mathcal{P}(\Omega)$. Consider generating a two-symbol sequence from $\{H, T\}$: flip a fair coin for the first symbol, then change to a second coin for the last symbol. We don't know anything about the second coin. We can define $\mathcal{F}$ to capture only what we *do* know:

$$\mathcal{F} = \Big\{\emptyset, \{HH, HT\}, \{TH, TT\}, \Omega\Big\}.$$

Here $\mathbb{P}(\{HH, HT\}) = \mathbb{P}(\{TH, TT\}) = \frac{1}{2}$. We can't assign probabilities to $\{HH\}$ alone because we don't know how the second coin behaves. The event space tells us what information is available.

This idea — $\mathcal{F}$ as a record of available information — becomes central when we study filtrations and conditional expectation later in the course.

### Independence and conditional probability

Two events $X$ and $Y$ are **independent** if $\mathbb{P}(X \cap Y) = \mathbb{P}(X) \cdot \mathbb{P}(Y)$. More generally, a collection of events $(X_i)_{i \in I}$ is independent if $\mathbb{P}\big(\bigcap_{i \in I} X_i\big) = \prod_{i \in I} \mathbb{P}(X_i)$ for all subcollections.

**Warning:** Pairwise independence does *not* imply full independence — Exercise 1 gives a classic counterexample.

If $\mathbb{P}(Y) > 0$, the **conditional probability** of $X$ given $Y$ is:

$$\mathbb{P}(X | Y) = \frac{\mathbb{P}(X \cap Y)}{\mathbb{P}(Y)}.$$

While this is a number now, later in the course the conditional probability (and conditional expectation) given a $\sigma$-algebra will be a *random variable*.

### Discrete probability space axioms

For a discrete probability space $(\Omega, \mathcal{F}, \mathbb{P})$, we require:
1. $\Omega \in \mathcal{F}$ and $\mathbb{P}(\Omega) = 1$.
2. $\mathcal{F}$ is closed under complements: $A \in \mathcal{F} \Rightarrow A^c \in \mathcal{F}$.
3. $\mathcal{F}$ is closed under finite disjoint unions: $A, B \in \mathcal{F}$, $A \cap B = \emptyset \Rightarrow A \cup B \in \mathcal{F}$.
4. $\mathcal{F}$ is closed under finite intersections: $A, B \in \mathcal{F} \Rightarrow A \cap B \in \mathcal{F}$.
5. $\mathbb{P}$ is **finitely additive**: if $A \cap B = \emptyset$, then $\mathbb{P}(A \cup B) = \mathbb{P}(A) + \mathbb{P}(B)$.

A collection $\mathcal{F}$ satisfying (1)-(4) is called an **algebra** on $\Omega$. When $\Omega$ is finite, these axioms suffice. When $\Omega$ is infinite, we'll need the stronger notion of a $\sigma$-algebra (Level 4).

## Key Results

### definition: Probability space (objects)
**Number:** Definition 1
**Plain English:** The three ingredients of a probabilistic model: a set of outcomes, a collection of events, and a function that assigns probabilities.
**Formal:** A probability space $(\Omega, \mathcal{F}, \mathbb{P})$ consists of a sample space $\Omega$, an event space $\mathcal{F} \subseteq \mathcal{P}(\Omega)$, and a probability function $\mathbb{P} : \mathcal{F} \to [0, 1]$.
**Load-bearing:** yes

### definition: Independence
**Number:** Definition (unnumbered, p.2)
**Plain English:** Events are independent when knowing one occurred tells you nothing about the others — their joint probability factorises.
**Formal:** Events $X$ and $Y$ are independent if $\mathbb{P}(X \cap Y) = \mathbb{P}(X) \cdot \mathbb{P}(Y)$. A collection $(X_i)_{i \in I}$ is independent if $\mathbb{P}\big(\bigcap_{i \in I} X_i\big) = \prod_{i \in I} \mathbb{P}(X_i)$ for all subcollections.
**Load-bearing:** yes

### definition: Conditional probability
**Number:** Definition 6
**Plain English:** The probability of $X$ updated by the knowledge that $Y$ has occurred.
**Formal:** For events $X, Y$ with $\mathbb{P}(Y) > 0$, the conditional probability is $\mathbb{P}(X|Y) = \frac{\mathbb{P}(X \cap Y)}{\mathbb{P}(Y)}$.
**Load-bearing:** yes

### definition: Discrete probability space (axioms)
**Number:** Definition 11
**Plain English:** The formal axioms for a probability space when $\Omega$ is finite — the event space must be an algebra and $\mathbb{P}$ must be finitely additive.
**Formal:** In a discrete probability space $(\Omega, \mathcal{F}, \mathbb{P})$, $\mathcal{F}$ must contain $\Omega$, be closed under complements, finite disjoint unions, and finite intersections. $\mathbb{P}$ must satisfy $\mathbb{P}(\Omega) = 1$ and be finitely additive.
**Load-bearing:** no

## Exercises

### exercise: Pairwise Independence vs Full Independence
**Number:** Exercise 1
**Difficulty:** warm-up
**Tags:** independence, counterexample, coin-flips

**Question:**
Two fair coins are flipped. Consider the three events $A = \{HT, HH\}$, $B = \{TH, HH\}$, $C = \{HH, TT\}$. Prove that any pair of these events are independent, but the set of all three is not.

**Hint 1:** Check pairwise independence directly
Each event has probability $\frac{1}{2}$. For each pair, compute the intersection and check if it equals $\frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}$.

**Hint 2:** Check the triple intersection
What is $A \cap B \cap C$? Compare $\mathbb{P}(A \cap B \cap C)$ with $\mathbb{P}(A) \cdot \mathbb{P}(B) \cdot \mathbb{P}(C)$.

**Solution:**
Each of $A$, $B$, $C$ has probability $\frac{1}{2}$. For any pair, the intersection is $\{HH\}$, which has probability $\frac{1}{4} = \frac{1}{2} \cdot \frac{1}{2}$. So each pair is independent.

But the intersection of all three is also $\{HH\}$, so $\mathbb{P}(A \cap B \cap C) = \frac{1}{4}$. For full independence we need this to equal $\mathbb{P}(A) \cdot \mathbb{P}(B) \cdot \mathbb{P}(C) = \frac{1}{8}$. Since $\frac{1}{4} \neq \frac{1}{8}$, the three events are not independent.

### exercise: Conditional Independence Characterisation
**Number:** Exercise 2
**Difficulty:** standard
**Tags:** independence, conditional-probability, counterexample

**Question:**
Suppose that $A_1, \ldots, A_n$ are events, and $\mathbb{P}(A_1 \cap \cdots \cap A_n) > 0$. Is it true that they are independent if and only if the following holds: for each $2 \leq k \leq n$, we have
$$\mathbb{P}(A_k \mid A_1 \cap A_2 \cap \cdots \cap A_{k-1}) = \mathbb{P}(A_k)?$$

**Hint 1:** Think about what the condition actually checks
The condition says that conditioning on any "initial segment" $A_1, \ldots, A_{k-1}$ doesn't change the probability of $A_k$. Does this check *all* subcollections, or just initial segments?

**Hint 2:** Try a specific counterexample on $\{1,\ldots,6\}$
Use the uniform distribution on $\{1, \ldots, 6\}$ with $A_1 = \{1,2,3\}$, $A_2 = \{2,3,4,5\}$, $A_3 = \{1,3,6\}$. Check the condition holds but the events aren't independent.

**Solution:**
This is **false**. The condition only checks that conditioning on "initial segments" $A_1, \ldots, A_{k-1}$ doesn't change $\mathbb{P}(A_k)$, but independence requires the factorisation property for *all* subcollections, not just initial ones.

**Counterexample:** Uniform distribution on $\{1, \ldots, 6\}$. Let $A_1 = \{1,2,3\}$, $A_2 = \{2,3,4,5\}$, $A_3 = \{1,3,6\}$.

- $\mathbb{P}(A_2 | A_1) = \frac{\mathbb{P}(\{2,3\})}{\mathbb{P}(\{1,2,3\})} = \frac{2}{3} = \mathbb{P}(A_2)$ ✓
- $\mathbb{P}(A_3 | A_1 \cap A_2) = \mathbb{P}(A_3 | \{2,3\}) = \frac{\mathbb{P}(\{3\})}{\mathbb{P}(\{2,3\})} = \frac{1}{2} = \mathbb{P}(A_3)$ ✓

So the condition holds. But $\mathbb{P}(A_2 \cap A_3) = \mathbb{P}(\{3\}) = \frac{1}{6} \neq \frac{2}{3} \cdot \frac{1}{2} = \mathbb{P}(A_2) \cdot \mathbb{P}(A_3)$.

### exercise: Algebra Closure Properties
**Number:** Exercise 3
**Difficulty:** warm-up
**Tags:** algebra, set-operations, closure

**Question:**
(a) Let $\mathcal{F}$ be an algebra on $\Omega$. Prove that for all $A, B \in \mathcal{F}$ we have $A \cup B \in \mathcal{F}$ and $A \setminus B \in \mathcal{F}$.

(b) Suppose $\mathcal{F}$ is a collection of subsets of $\Omega$ which is closed under complements and any (not necessarily disjoint) finite unions. Prove that it is closed under finite intersections.

**Hint 1:** Express operations using complements and intersections
For (a), write $A \setminus B$ and $A \cup B$ using only complements and intersections, which are the operations an algebra provides.

**Hint 2:** Apply De Morgan's law for (b)
$A \cap B = (A^c \cup B^c)^c$.

**Solution:**
(a) We have $A \setminus B = A \cap B^c$. Since $B \in \mathcal{F}$, we get $B^c \in \mathcal{F}$ by closure under complements, and then $A \cap B^c \in \mathcal{F}$ by closure under intersections. For unions: $A \cup B = A \cup (B \setminus A)$, and $B \setminus A$ is disjoint from $A$, so this is a disjoint union and $A \cup B \in \mathcal{F}$.

(b) By De Morgan's law, $A \cap B = (A^c \cup B^c)^c$. Since $\mathcal{F}$ is closed under complements (giving $A^c, B^c$), under unions (giving $A^c \cup B^c$), and again under complements (giving $(A^c \cup B^c)^c = A \cap B$), we're done. By induction, any finite intersection is in $\mathcal{F}$.
