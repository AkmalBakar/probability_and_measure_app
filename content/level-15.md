---
level: 15
title: "Properties of Conditional Expectation"
status: wip
notes: 4
prerequisites: [14]
---

# Level 15: Properties of Conditional Expectation

## Reading

Now that we have the formal definition of conditional expectation, we need to develop a toolkit for working with it. The good news: conditional expectation inherits many properties from ordinary expectation, often in the form "conditional versions" of statements we already know. The bad news: the proofs require more care, because conditional expectations are random variables (not numbers), and statements hold "almost surely" rather than exactly.

### The master theorem

**Theorem 5.** Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space. We assume all random variables $X$ have $\mathbb{E}(|X|) < \infty$, and we assume all claimed conditional expectations exist. Let $\mathcal{G}$ and $\mathcal{G}'$ be $\sigma$-algebras contained in $\mathcal{F}$. Then the following hold.

**(CE1) Known variables pass through.** If $X$ is $\mathcal{G}$-measurable, then $\mathbb{E}(X | \mathcal{G}) = X$ almost surely.

**(CE2) Linearity.** For $\alpha, \beta \in \mathbb{R}$ we have $\mathbb{E}(\alpha X + \beta Y | \mathcal{G}) = \alpha \mathbb{E}(X | \mathcal{G}) + \beta \mathbb{E}(Y | \mathcal{G})$ almost surely.

**(CE3) Monotonicity.** If $X \leq Y$ pointwise almost surely, then $\mathbb{E}(X | \mathcal{G}) \leq \mathbb{E}(Y | \mathcal{G})$ pointwise almost surely.

**(CE4) Conditional MCT.** If $0 \leq X_1 \leq X_2 \leq \cdots$ holds almost surely and almost surely the sequence converges pointwise to $X$, then $\mathbb{E}(X | \mathcal{G}) = \lim_{n \to \infty} \mathbb{E}(X_n | \mathcal{G})$ almost surely.

**(CE5) Conditional DCT.** If almost surely $|X_n| \leq Z$ for all $n \in \mathbb{N}$ and some $Z$ with $\mathbb{E}(|Z|) < \infty$, and $\lim_{n \to \infty} X_n = X$ pointwise almost surely, then $\mathbb{E}(X | \mathcal{G}) = \lim_{n \to \infty} \mathbb{E}(X_n | \mathcal{G})$ almost surely.

**(CE6) Conditional Fatou.** If $X_1, X_2, \ldots \geq 0$ almost surely, then $\mathbb{E}(\liminf_{n \to \infty} X_n | \mathcal{G}) \leq \liminf_{n \to \infty} \mathbb{E}(X_n | \mathcal{G})$ almost surely.

**(CE7) Conditional reverse Fatou.** If $|X_n| \leq Z$ almost surely for all $n \in \mathbb{N}$ and some $Z$ with $\mathbb{E}(|Z|) < \infty$, then $\mathbb{E}(\limsup_{n \to \infty} X_n | \mathcal{G}) \geq \limsup_{n \to \infty} \mathbb{E}(X_n | \mathcal{G})$ almost surely.

**(CE8) Conditional Jensen inequality.** Let $g : \mathbb{R} \to \mathbb{R}$ be convex. Then $\mathbb{E}(g(X) | \mathcal{G}) \geq g(\mathbb{E}(X | \mathcal{G}))$ almost surely. Furthermore, if $X \in [a, b]$ and $\mathbb{E}(X | \mathcal{G}) = \Lambda a + (1 - \Lambda)b$, then $\mathbb{E}(g(X) | \mathcal{G}) \leq \Lambda g(a) + (1 - \Lambda)g(b)$ almost surely. Note $\Lambda$ is a random variable.

**(CE9) Tower property.** If $\mathcal{G}' \subseteq \mathcal{G}$ then $\mathbb{E}(\mathbb{E}(X | \mathcal{G}) | \mathcal{G}') = \mathbb{E}(X | \mathcal{G}')$ almost surely.

**(CE10) Taking out what is known.** If $Y$ is $\mathcal{G}$-measurable and $\mathbb{E}(|XY|) < \infty$, then $\mathbb{E}(XY | \mathcal{G}) = \mathbb{E}(X | \mathcal{G}) Y$ almost surely.

**(CE11) Independence.** If $\sigma(X)$ and $\mathcal{G}$ are independent, then $\mathbb{E}(X | \mathcal{G}) = \mathbb{E}(X)$ almost surely.

### Proof strategy

For all of these, we have to prove that the claimed formula satisfies conditions (i), (ii), and (iii) of Definition 4. Conditions (i) and (ii) are trivially satisfied (the arithmetic and analytic operations on $\mathcal{G}$-measurable functions give us $\mathcal{G}$-measurable functions), and we will just focus on condition (iii). Because any two versions of a conditional expectation are almost surely equal (Exercise 2), it is enough to verify that the formula satisfies the definition of a conditional expectation.

### Key proofs

**CE1:** Definitional — it requires $\mathbb{E}(X \mathbf{1}_A) = \mathbb{E}(X \mathbf{1}_A)$ for all $A \in \mathcal{G}$.

**CE2:** Given $A \in \mathcal{G}$:
$$\mathbb{E}\!\left((\alpha \mathbb{E}(X|\mathcal{G}) + \beta \mathbb{E}(Y|\mathcal{G})) \mathbf{1}_A\right) = \alpha \mathbb{E}(\mathbb{E}(X|\mathcal{G}) \mathbf{1}_A) + \beta \mathbb{E}(\mathbb{E}(Y|\mathcal{G}) \mathbf{1}_A) = \alpha \mathbb{E}(X \mathbf{1}_A) + \beta \mathbb{E}(Y \mathbf{1}_A) = \mathbb{E}((\alpha X + \beta Y) \mathbf{1}_A).$$

**CE3:** Let $Z$ be a version of $\mathbb{E}(X|\mathcal{G})$ and $Z'$ a version of $\mathbb{E}(Y|\mathcal{G})$. Consider the set $A_n = \{\omega : Z(\omega) \leq Z'(\omega) - \frac{1}{n}\}$. This is in $\mathcal{G}$ since $Z - Z'$ is $\mathcal{G}$-measurable, so we have
$$\mathbb{E}(X \mathbf{1}_{A_n}) = \mathbb{E}(Z \mathbf{1}_{A_n}) \leq \mathbb{E}(Z' \mathbf{1}_{A_n}) - \tfrac{1}{n} \mathbb{P}(A_n) = \mathbb{E}(Y \mathbf{1}_{A_n}) - \tfrac{1}{n}\mathbb{P}(A_n).$$
Since $X \leq Y$ a.s., $\mathbb{E}(X \mathbf{1}_{A_n}) \leq \mathbb{E}(Y \mathbf{1}_{A_n})$. Combining: $\tfrac{1}{n}\mathbb{P}(A_n) \leq 0$, so $\mathbb{P}(A_n) = 0$. By countable additivity, $\mathbb{P}(\bigcup A_n) = 0$, giving $Z \geq Z'$ a.s.

**CE4 (Conditional MCT):** Given $A \in \mathcal{G}$:
$$\mathbb{E}\!\left((\lim_{n \to \infty} \mathbb{E}(X_n|\mathcal{G})) \mathbf{1}_A\right) = \lim_{n \to \infty} \mathbb{E}\!\left(\mathbb{E}(X_n|\mathcal{G}) \mathbf{1}_A\right) = \lim_{n \to \infty} \mathbb{E}(X_n \mathbf{1}_A) = \mathbb{E}(X \mathbf{1}_A).$$
The first equality uses MCT (the sequence $\mathbb{E}(X_n|\mathcal{G})$ is almost surely monotone increasing by CE3). The last equality is the standard MCT.

**CE9 (Tower property):** Since $\mathcal{G}' \subseteq \mathcal{G}$, for any $A \in \mathcal{G}'$ we have $A \in \mathcal{G}$, so:
$$\mathbb{E}\!\left(\mathbb{E}(\mathbb{E}(X|\mathcal{G})|\mathcal{G}') \mathbf{1}_A\right) = \mathbb{E}\!\left(\mathbb{E}(X|\mathcal{G}) \mathbf{1}_A\right) = \mathbb{E}(X \mathbf{1}_A).$$

**A common special case of the tower property:** Letting $\mathcal{G}' = \{\emptyset, \Omega\}$ (the trivial $\sigma$-algebra), we get $\mathbb{E}(\mathbb{E}(X|\mathcal{G})) = \mathbb{E}(X)$. This is the **law of total expectation** for general $\sigma$-algebras.

**CE10 (Taking out what is known):** First suppose $Y \geq 0$. Let $Y' = \sum_i \alpha_i \mathbf{1}_{B_i}$ be a $\mathcal{G}$-measurable simple function bounded between 0 and $Y$ pointwise, and for any $A \in \mathcal{G}$:
$$\mathbb{E}\!\left(\mathbb{E}(X|\mathcal{G}) Y' \mathbf{1}_A\right) = \sum_i \alpha_i \mathbb{E}\!\left(\mathbb{E}(X|\mathcal{G}) \mathbf{1}_{A \cap B_i}\right) = \sum_i \alpha_i \mathbb{E}(X \mathbf{1}_{A \cap B_i}) = \mathbb{E}(X Y' \mathbf{1}_A),$$
where we used condition (iii) and $\mathbf{1}_{A \cap B_i} = \mathbf{1}_A \mathbf{1}_{B_i}$. Now taking a monotone increasing sequence of $\mathcal{G}$-measurable simple functions converging to $Y$, and applying MCT twice, we get $\mathbb{E}(\mathbb{E}(X|\mathcal{G}) Y \mathbf{1}_A) = \mathbb{E}(XY \mathbf{1}_A)$ as required.

**CE11 (Independence):** If $\sigma(X)$ and $\mathcal{G}$ are independent, then for $A \in \mathcal{G}$:
$$\mathbb{E}(\mathbb{E}(X) \mathbf{1}_A) = \mathbb{E}(X) \mathbb{E}(\mathbf{1}_A) = \mathbb{E}(X \mathbf{1}_A)$$
where the last step uses multiplicativity of expectation for independent random variables ($X$ and $\mathbf{1}_A$ are independent).

**CE8 (Conditional Jensen — the hard one):** The conditional reverse Jensen inequality (for $X \in [a,b]$, convexity gives $g(x) \leq \frac{b-x}{b-a}g(a) + \frac{x-a}{b-a}g(b)$) follows from CE3. For the forward direction ($\mathbb{E}(g(X)|\mathcal{G}) \geq g(\mathbb{E}(X|\mathcal{G}))$), one considers the set $L$ of all lines $px + q$ with $p, q \in \mathbb{Q}$ such that $px + q \leq g(x)$ for all $x$. This set is countable. For each such line, by CE3 and CE2, $\mathbb{E}(g(X)|\mathcal{G}) \geq p\mathbb{E}(X|\mathcal{G}) + q$ almost surely. Taking the supremum over countably many such lines (the exceptional sets of measure zero have a countable union, hence measure zero), and using the fact that the rational-coefficient supporting lines recover $g$ from below, gives the result.

## Key Results

### theorem: Properties of conditional expectation CE1-CE11
**Number:** Theorem 5
**Plain English:** Conditional expectation satisfies linearity, monotonicity, the tower property, taking out known factors, independence, and conditional versions of MCT, DCT, Fatou, and Jensen — all holding almost surely.
**Formal:** See the 11 properties listed above: CE1 (known pass through), CE2 (linearity), CE3 (monotonicity), CE4 (conditional MCT), CE5 (conditional DCT), CE6 (conditional Fatou), CE7 (conditional reverse Fatou), CE8 (conditional Jensen), CE9 (tower property), CE10 (taking out what is known), CE11 (independence).
**Proof sketch:** For each property, verify condition (iii) of Definition 4 by computing $\mathbb{E}(\cdot \, \mathbf{1}_A)$ for $A \in \mathcal{G}$. Most follow directly from the corresponding property of expectation. CE8 (Jensen) is the most technical, using rational-coefficient supporting lines.
**Key technique:** Verify condition (iii) for each property; use uniqueness (Exercise 2) to conclude
**Depends on:** Definition 4 (Level 14), MCT/DCT/Fatou (Level 8)
**Used by:** Martingales (Level 17), Radon-Nikodym proof of existence (Level 16)
**Load-bearing:** yes

## Exercises

### exercise: Prove CE properties
**Number:** Exercise 4 (selected proofs)
**Difficulty:** standard
**Tags:** conditional-expectation, tower-property, monotonicity, CE-properties

**Question:**
Prove properties CE3 (monotonicity), CE9 (tower property), and CE10 (taking out what is known) from Definition 4.

**Hint 1:** All proofs follow the same pattern
For each property, let the claimed formula be $Z$. Verify: (i) $\mathbb{E}(|Z|) < \infty$, (ii) $Z$ is $\mathcal{G}$-measurable (or $\mathcal{G}'$-measurable for CE9), (iii) $\mathbb{E}(Z \mathbf{1}_A) = \mathbb{E}(X \mathbf{1}_A)$ for all $A$ in the relevant $\sigma$-algebra.

**Hint 2:** Key steps for each
- **CE3:** Consider $A_n = \{Z < Z' - 1/n\}$. This is in $\mathcal{G}$. Show $\mathbb{P}(A_n) = 0$ using condition (iii) and the pointwise inequality $X \leq Y$.
- **CE9:** For $A \in \mathcal{G}'$, since $\mathcal{G}' \subseteq \mathcal{G}$ we have $A \in \mathcal{G}$, so apply condition (iii) twice.
- **CE10:** Start with simple $Y \geq 0$, use linearity and condition (iii). Extend to general $Y \geq 0$ by MCT, then to signed $Y$ by $Y = Y^+ - Y^-$.

**Solution:**
**CE3 (Monotonicity):** Let $Z$ be a version of $\mathbb{E}(X|\mathcal{G})$ and $Z'$ a version of $\mathbb{E}(Y|\mathcal{G})$. For $n \in \mathbb{N}$, let $A_n = \{\omega : Z(\omega) > Z'(\omega) + \frac{1}{n}\}$. Since $Z - Z'$ is $\mathcal{G}$-measurable, $A_n \in \mathcal{G}$. By condition (iii):
$$\mathbb{E}(X \mathbf{1}_{A_n}) = \mathbb{E}(Z \mathbf{1}_{A_n}) \geq \mathbb{E}(Z' \mathbf{1}_{A_n}) + \tfrac{1}{n}\mathbb{P}(A_n) = \mathbb{E}(Y \mathbf{1}_{A_n}) + \tfrac{1}{n}\mathbb{P}(A_n).$$
But $X \leq Y$ a.s. implies $\mathbb{E}(X \mathbf{1}_{A_n}) \leq \mathbb{E}(Y \mathbf{1}_{A_n})$, so $\mathbb{P}(A_n) = 0$. Taking the union: $\mathbb{P}(\bigcup_n A_n) = 0$, so $Z \leq Z'$ a.s.

**CE9 (Tower property):** Let $A \in \mathcal{G}'$. Since $\mathcal{G}' \subseteq \mathcal{G}$, we have $A \in \mathcal{G}$. Therefore:
$$\mathbb{E}(\mathbb{E}(\mathbb{E}(X|\mathcal{G})|\mathcal{G}') \mathbf{1}_A) = \mathbb{E}(\mathbb{E}(X|\mathcal{G}) \mathbf{1}_A) = \mathbb{E}(X \mathbf{1}_A),$$
where the first equality uses condition (iii) for $\mathbb{E}(\cdot|\mathcal{G}')$ (since $A \in \mathcal{G}'$), and the second uses condition (iii) for $\mathbb{E}(\cdot|\mathcal{G})$ (since $A \in \mathcal{G}$). This shows $\mathbb{E}(\mathbb{E}(X|\mathcal{G})|\mathcal{G}')$ is a version of $\mathbb{E}(X|\mathcal{G}')$.

**CE10 (Taking out what is known):** Suppose first $Y \geq 0$. Let $Y' = \sum_i \alpha_i \mathbf{1}_{B_i}$ be a $\mathcal{G}$-measurable simple function with $0 \leq Y' \leq Y$. For any $A \in \mathcal{G}$:
$$\mathbb{E}(\mathbb{E}(X|\mathcal{G}) Y' \mathbf{1}_A) = \sum_i \alpha_i \mathbb{E}(\mathbb{E}(X|\mathcal{G}) \mathbf{1}_{A \cap B_i}) = \sum_i \alpha_i \mathbb{E}(X \mathbf{1}_{A \cap B_i}) = \mathbb{E}(XY' \mathbf{1}_A).$$
Now take a monotone increasing sequence of simple functions converging to $Y$ and apply MCT twice to get $\mathbb{E}(\mathbb{E}(X|\mathcal{G}) Y \mathbf{1}_A) = \mathbb{E}(XY \mathbf{1}_A)$. For general $Y$: write $Y = Y^+ - Y^-$ and apply linearity.

### exercise: Conditional Jensen proof
**Number:** Exercise 5 (CE8 proof)
**Difficulty:** challenge
**Tags:** conditional-expectation, Jensen, convexity, supporting-lines

**Question:**
Prove the conditional Jensen inequality (CE8): if $g : \mathbb{R} \to \mathbb{R}$ is convex, then $\mathbb{E}(g(X)|\mathcal{G}) \geq g(\mathbb{E}(X|\mathcal{G}))$ almost surely.

*(Hint: use supporting lines with rational coefficients to avoid uncountable unions of measure-zero sets.)*

**Hint 1:** Supporting lines characterize convexity
For any convex $g$, at every point $x_0$ there exists a line $\ell(x) = px + q$ with $\ell(x_0) = g(x_0)$ and $\ell(x) \leq g(x)$ for all $x$ (supporting line / subgradient). The set $L$ of all lines $px + q$ such that $p, q \in \mathbb{Q}$ and $px + q \leq g(x)$ for all $x$ is countable.

**Hint 2:** Apply CE3 and CE2 to each rational line
For each $px + q \in L$, by CE3: $\mathbb{E}(g(X)|\mathcal{G}) \geq \mathbb{E}(pX + q|\mathcal{G}) = p\mathbb{E}(X|\mathcal{G}) + q$ almost surely. The exceptional set has measure zero. Since $L$ is countable, the union of all exceptional sets still has measure zero. Then argue that $\sup_{px+q \in L}(px + q) = g(x)$ for all $x$.

**Solution:**
Consider the set $L$ of all lines $px + q$ such that $p, q \in \mathbb{Q}$ and $px + q \leq g(x)$ holds for all $x$. We claim that this set is non-empty and for any $(x, y)$ with $y < g(x)$ there exists a line in $L$ which passes above $(x, y)$.

To see this: for any given $n$ sufficiently large, there are subgradients to $g$ at $-n$ and at $n$ which are different (this exists because $g$ is not linear), for any larger $n$ the same property remains true. Convexity implies that the value of any subgradient at $c$ is increasing in $c$; draw subtangent lines at $c$ and $c' > c$ with decreasing slope: their intersection above the line from $(c, g(c))$ to $(c', g(c'))$; by convexity the function lies below this line but by definition of a subtangent the function lies above the triangle, a contradiction. So picking a subtangent $m(x - c) + g(c)$ at any given $c \in (-n, n) \cap \mathbb{Q}$, for any rational $q < g(c)$ we can choose a rational approximation $p$ to $m$ such that $px + q$ lies below $g(x)$ on $[-n, n]$. Then this line lies below $g(x)$ on $(-\infty, \infty)$ and separates any $(x, y)$ with $y < g(x)$ from $g(x)$.

Now (CE3) says $\mathbb{E}(g(X)|\mathcal{G}) \geq \mathbb{E}(pX + q|\mathcal{G}) = p\mathbb{E}(X|\mathcal{G}) + q$ almost surely for each $px + q \in L$. Let $A_\ell$ be the set of measure zero on which this fails. Since $|L| \leq |\mathbb{Q}|^2$ is countable, letting $A = \bigcup_{\ell \in L} A_\ell$ we see that $A$ has measure zero.

Given $\omega \notin A$, let $y = \mathbb{E}(g(X)|\mathcal{G})(\omega)$ and $x = \mathbb{E}(X|\mathcal{G})(\omega)$. Then $y \geq px + q$ for all $px + q \in L$. By our claim, $y \geq g(x)$. So $\mathbb{E}(g(X)|\mathcal{G}) \geq g(\mathbb{E}(X|\mathcal{G}))$ almost surely. $\blacksquare$
