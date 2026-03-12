---
level: 12
title: "Binary JL & Compressive Sensing"
status: wip
notes: 3
prerequisites: [11]
---

# Level 12: Binary JL & Compressive Sensing

## Reading

Levels 10 and 11 established the Johnson-Lindenstrauss lemma using Gaussian random matrices: if $G$ is an $n \times d$ matrix with i.i.d. $N(0, 1/d)$ entries, then the random projection $x \mapsto Gx$ approximately preserves distances with high probability when $d = O(\varepsilon^{-2} \log N)$. That is a beautiful result, but it has a practical problem. Generating Gaussian random numbers requires computing transcendental functions (logarithms, square roots, inverse error functions). Each entry needs many bits to store, and the generation itself is slow. If you are building a system that projects millions of data points in real time -- say, a nearest-neighbor search engine or a compressed sensing MRI scanner -- the cost of the random matrix itself becomes a bottleneck.

This level asks: can we replace the Gaussian matrix with something much simpler and still get the same guarantee? The answer is yes, and the "something simpler" is as simple as it gets: entries drawn uniformly from $\{-d^{-1/2}, +d^{-1/2}\}$. Each entry is a single coin flip, stored as a single bit. No transcendental functions, no floating-point arithmetic for generation, just random signs scaled by $d^{-1/2}$.

### The key insight: moment comparison

The entire argument rests on a single structural observation. Let $W$ be an $n \times d$ matrix with i.i.d. entries uniformly chosen from $\{-d^{-1/2}, +d^{-1/2}\}$, and let $x \in \mathbb{R}^d$ be a unit vector. Consider the random variable $X = \sum_{j=1}^d x_j W_{1j}$ (one coordinate of the projection $Wx$). Compare it with $Y \sim N(0, 1/d)$ (the corresponding coordinate in the Gaussian case).

The critical fact is:

$$0 \leq \mathbb{E}(X^k) \leq \mathbb{E}(Y^k) \quad \text{for all } k \geq 0.$$

That is, the moments of the binary projection are *dominated* by the moments of the Gaussian projection, at every order. Since the moment generating function $\mathbb{E}(e^{tX^2})$ is a power series in the moments of $X$, this moment domination translates directly into an MGF bound:

$$\mathbb{E}(e^{tX^2}) \leq \mathbb{E}(e^{tY^2}).$$

But the Gaussian MGF is exactly what we used in Level 11 to prove the JL lemma. So the binary matrix inherits the same concentration bound, and therefore the same JL guarantee, with no extra work.

This is a powerful proof strategy that appears throughout probability: rather than analyzing a complicated object directly, show that its moments are controlled by those of a simpler object whose behavior is already understood.

### Why the binary case is easier than it looks

The reason the moment comparison works so cleanly is a remarkable algebraic coincidence. Since $W_{1j} \in \{-d^{-1/2}, +d^{-1/2}\}$, we have $W_{1j}^2 = d^{-1}$ with probability 1 -- not just in expectation, but *surely*. This deterministic squaring property means that when we expand $\mathbb{E}(X^k) = \mathbb{E}\bigl((\sum x_j W_{1j})^k\bigr)$ as a multinomial, any term containing $W_{1j}^2$ can be replaced by the constant $d^{-1}$. The combinatorics of the expansion then reduce to a simple counting argument, and the resulting bound matches the Gaussian recurrence $(k-1)/d \cdot \mathbb{E}(Y^{k-2})$ at each step.

### The even-moment recurrence (the heart of the proof)

For even $k \geq 4$, the bound $\mathbb{E}(X^k) \leq \frac{k-1}{d} \mathbb{E}(X^{k-2})$ is proved by a combinatorial argument about the multinomial expansion of $(\sum x_j W_{1j})^k$. Think of this as choosing one factor $x_j W_{1j}$ from each of $k$ "brackets." Fix the choice from the first bracket: say we pick $x_j W_{1j}$. For the resulting term to have nonzero expectation, we need at least one other bracket to also contribute a factor involving $W_{1j}$ (otherwise we get an odd power of $W_{1j}$, whose expectation is zero by symmetry). There are $k-1$ other brackets to choose from, and once we pair the first bracket with bracket $s$, the factor $x_j^2 W_{1j}^2 = x_j^2 / d$ comes out as a constant, leaving $(\sum x_i W_{1i})^{k-2}$ from the remaining brackets. Summing over $j$ (using $\sum x_j^2 = 1$) and the $k-1$ choices of $s$, we get the bound.

The Gaussian $Y \sim N(0, 1/d)$ satisfies the same recurrence with *equality*: $\mathbb{E}(Y^k) = \frac{k-1}{d} \mathbb{E}(Y^{k-2})$. This is proved by integration by parts (or equivalently, LOTUS applied to the Gaussian density). Since the base cases $k = 0$ and $k = 2$ give equality ($\mathbb{E}(X^0) = \mathbb{E}(Y^0) = 1$ and $\mathbb{E}(X^2) = \mathbb{E}(Y^2) = 1/d$), induction gives $\mathbb{E}(X^k) \leq \mathbb{E}(Y^k)$ for all $k$.

### From MGF bound to JL

Once we have $\mathbb{E}(e^{tX^2}) \leq \mathbb{E}(e^{tY^2}) = (1 - 2t/d)^{-1/2}$ for each coordinate, the argument from Level 11 carries over verbatim. We have $\|Wx\|_2^2 = \sum_{i=1}^n X_i^2$ where the $X_i$ are independent (they use different rows of $W$), so

$$\mathbb{E}(e^{t\|Wx\|_2^2}) = \prod_{i=1}^n \mathbb{E}(e^{tX_i^2}) \leq (1 - 2t/d)^{-n/2}.$$

This is the same MGF bound as in the Gaussian case. Applying Markov's inequality to $e^{t\|Wx\|_2^2}$ and optimizing over $t$ gives the same tail bounds:

$$\mathbb{P}\bigl(\|Wx\|_2^2 \geq (1+\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 d/8}, \qquad \mathbb{P}\bigl(\|Wx\|_2^2 \leq (1-\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 d/8}.$$

For the lower tail, there is a subtlety: we need $\mathbb{E}(e^{-tX^2})$ rather than $\mathbb{E}(e^{tX^2})$. Since $e^{-u} \leq 1 - u + u^2/2$ (the alternating Taylor series gives an upper bound when truncated at an even term), we get $\mathbb{E}(e^{-tX^2}) \leq 1 - t\mathbb{E}(X^2) + \frac{t^2}{2}\mathbb{E}(X^4) \leq 1 - t/d + 3t^2/(2d^2)$. The rest of the argument (taking the $n$-th power, applying Markov, optimizing $t = \varepsilon d/8$) follows the Gaussian case.

### Compressive Sensing

The JL lemma has a remarkable application beyond dimensionality reduction. Suppose a vector $v \in \mathbb{R}^n$ is **$s$-sparse**: it has at most $s$ nonzero entries out of $n$. The set $S$ of all $s$-sparse binary vectors (entries in $\{0, 1\}$) has size at most $\binom{n}{s} \leq (en/s)^s$. By the JL lemma with $\varepsilon = 0.5$, if $d = O(s \log(en/s))$, there exists a random $n \times d$ projection matrix $W$ such that all pairwise distances between elements of $S$ are preserved up to a factor of 2. In particular, any two distinct sparse vectors have distinct projections -- meaning the projection is *injective* on sparse vectors.

This is the foundation of **compressive sensing**: we can recover the original $n$-dimensional sparse vector from its $d$-dimensional projection, where $d \ll n$. The recovery can be performed by linear programming (minimizing the $\ell^1$ norm subject to the projection constraint).

The practical impact is dramatic. In MRI scanning, the underlying signal (a medical image) is approximately sparse in an appropriate basis (e.g., wavelets). Instead of acquiring the full set of measurements required by the Nyquist-Shannon theorem, the scanner takes a much smaller set of random projections and reconstructs the image computationally. Siemens has reported a 20-fold speedup for cardiac MRI using compressive sensing, turning a scan that required the patient to hold their breath for an uncomfortably long time into one that finishes in seconds.

## Key Results

### theorem: Binary JL moment bound
**Plain English:** The even moments of a binary random projection $\sum x_j W_{1j}$ (where $W_{1j} \in \{-d^{-1/2}, +d^{-1/2}\}$ uniformly) are dominated by those of $Y \sim N(0, 1/d)$ at every order, and equality holds for $k = 0$ and $k = 2$.
**Formal:** Let $W_{1j}$ be i.i.d. uniform on $\{-d^{-1/2}, +d^{-1/2}\}$ and $x \in \mathbb{R}^d$ a unit vector. Let $X = \sum_{j=1}^d x_j W_{1j}$ and $Y \sim N(0, 1/d)$. Then for all $k \geq 0$:
$$0 \leq \mathbb{E}(X^k) \leq \mathbb{E}(Y^k).$$
For odd $k$, both sides are zero. For even $k$, the bound follows from $\mathbb{E}(X^k) \leq \frac{k-1}{d}\mathbb{E}(X^{k-2})$ combined with the Gaussian identity $\mathbb{E}(Y^k) = \frac{k-1}{d}\mathbb{E}(Y^{k-2})$ and induction.
**Key technique:** Multinomial expansion, deterministic squaring $W_{1j}^2 = d^{-1}$, induction
**Load-bearing:** no (excellent exam exercise)

### theorem: Binary JL Theorem
**Plain English:** The JL dimensionality reduction guarantee -- that distances are approximately preserved by random projection into $O(\varepsilon^{-2} \log N)$ dimensions -- holds when the projection matrix has i.i.d. $\pm d^{-1/2}$ entries instead of Gaussian entries.
**Formal:** Let $W$ be an $n \times d$ random matrix with i.i.d. entries uniform on $\{-d^{-1/2}, +d^{-1/2}\}$, and let $x \in \mathbb{R}^d$ with $\|x\|_2 = 1$. Then for $\varepsilon \in (0, 1)$:
$$\mathbb{P}\bigl(\|Wx\|_2^2 \geq (1+\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 d/8}, \qquad \mathbb{P}\bigl(\|Wx\|_2^2 \leq (1-\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 d/8}.$$
**Key technique:** Moment comparison with Gaussian, MGF bound, Markov's inequality
**Load-bearing:** no (excellent exam exercise)

### result: Compressive Sensing Principle
**Plain English:** If a signal in $\mathbb{R}^n$ is $s$-sparse, it can be exactly recovered from $O(s \log(en/s))$ random linear measurements, because the JL lemma ensures the random projection is injective on sparse vectors.
**Formal:** Let $S \subseteq \mathbb{R}^n$ be the set of $s$-sparse binary vectors. Then $|S| \leq (en/s)^s$. By the JL lemma with $\varepsilon = 1/2$ and $N = |S|^2$ pairs, taking $d = O(s \log(en/s))$ suffices to ensure all pairwise distances are preserved. In particular, the projection is injective on $S$, and recovery can be performed via $\ell^1$ minimization.
**Key technique:** JL lemma, counting sparse vectors, union bound
**Load-bearing:** no

## Exercises

### exercise: Moments of binary random projections
**Number:** Exercise 6(a-b)
**Difficulty:** warm-up
**Tags:** moments, binary-matrix, multinomial-expansion

**Question:**
Let $W$ be an $n \times d$ random matrix with entries independently and uniformly chosen from $\{-d^{-1/2}, +d^{-1/2}\}$, and let $x \in \mathbb{R}^d$ with $\|x\|_2 = 1$. Define $X = \sum_{j=1}^d x_j W_{1j}$.

(a) Verify that $\mathbb{E}(W_{ij}) = 0$ and $\mathbb{E}(W_{ij}^2) = 1/d$.

(b) Calculate $\mathbb{E}(X^k)$ for $k = 0, 1, 2, 3, 4$.

**Hint 1:** Use the explicit distribution of $W_{ij}$
Since $W_{ij} = +d^{-1/2}$ or $-d^{-1/2}$ each with probability $1/2$, compute $\mathbb{E}(W_{ij})$ directly. For $\mathbb{E}(W_{ij}^2)$, note that $W_{ij}^2 = d^{-1}$ with probability 1 (not just in expectation -- this is a deterministic identity).

**Hint 2:** Expand the powers using independence
For $k=2$: expand $X^2 = \sum_{j,l} x_j x_l W_{1j} W_{1l}$. By independence, $\mathbb{E}(W_{1j}W_{1l}) = 0$ when $j \neq l$ (since both have mean 0) and $\mathbb{E}(W_{1j}^2) = 1/d$. For $k=4$: expand carefully and use $W_{1j}^4 = d^{-2}$ (surely) and $W_{1j}^2 = d^{-1}$ (surely). The cross terms involving odd powers of any $W_{1j}$ vanish.

**Solution:**
**(a)** Since $W_{ij}$ takes values $+d^{-1/2}$ and $-d^{-1/2}$ each with probability $1/2$:

$$\mathbb{E}(W_{ij}) = \frac{1}{2}(d^{-1/2}) + \frac{1}{2}(-d^{-1/2}) = 0.$$

$$\mathbb{E}(W_{ij}^2) = \frac{1}{2}(d^{-1/2})^2 + \frac{1}{2}(-d^{-1/2})^2 = \frac{1}{2} \cdot d^{-1} + \frac{1}{2} \cdot d^{-1} = d^{-1}.$$

In fact, $W_{ij}^2 = d^{-1}$ surely, since both possible values of $W_{ij}$ square to $d^{-1}$.

**(b)** We compute $\mathbb{E}(X^k)$ for each $k$.

**$k = 0$:** $\mathbb{E}(X^0) = \mathbb{E}(1) = 1$.

**$k = 1$:** By linearity, $\mathbb{E}(X) = \sum_{j=1}^d x_j \mathbb{E}(W_{1j}) = 0$ since each $\mathbb{E}(W_{1j}) = 0$.

**$k = 2$:** Expand:

$$\mathbb{E}(X^2) = \mathbb{E}\Bigl(\sum_{j=1}^d \sum_{l=1}^d x_j x_l W_{1j} W_{1l}\Bigr) = \sum_{j=1}^d \sum_{l=1}^d x_j x_l \, \mathbb{E}(W_{1j} W_{1l}).$$

For $j \neq l$: $\mathbb{E}(W_{1j} W_{1l}) = \mathbb{E}(W_{1j})\mathbb{E}(W_{1l}) = 0$ by independence and zero mean. For $j = l$: $\mathbb{E}(W_{1j}^2) = d^{-1}$. Therefore:

$$\mathbb{E}(X^2) = \sum_{j=1}^d x_j^2 \cdot d^{-1} = d^{-1} \|x\|_2^2 = d^{-1}.$$

**$k = 3$:** $\mathbb{E}(X^3) = 0$. This follows because the distribution of $W_{1j}$ is symmetric about 0, so the distribution of $X = \sum x_j W_{1j}$ is symmetric about 0 (flipping all signs gives $-X$ with the same distribution). All odd moments of a symmetric distribution are zero.

**$k = 4$:** Expand $X^4 = \bigl(\sum_{j} x_j W_{1j}\bigr)^4 = \sum_{j_1, j_2, j_3, j_4} x_{j_1} x_{j_2} x_{j_3} x_{j_4} W_{1j_1} W_{1j_2} W_{1j_3} W_{1j_4}$.

Taking expectations, a term $\mathbb{E}(W_{1j_1} W_{1j_2} W_{1j_3} W_{1j_4})$ is nonzero only if every index that appears does so an even number of times (otherwise some $W_{1j}$ appears to an odd power, giving expectation 0 by symmetry). The nonzero patterns are:

- **All four indices equal** ($j_1 = j_2 = j_3 = j_4 = j$): contributes $\sum_j x_j^4 \cdot \mathbb{E}(W_{1j}^4) = \sum_j x_j^4 \cdot d^{-2}$.
- **Two pairs** ($j_1 = j_2 \neq j_3 = j_4$, and the two other pairings): contributes $\binom{4}{2}/2 = 3$ pairings (choosing which two of the four positions share the first index), but we must subtract the all-equal case counted three times. More carefully, the number of ways to partition $\{1,2,3,4\}$ into two pairs is 3. Each pairing contributes $\sum_{j \neq l} x_j^2 x_l^2 \cdot \mathbb{E}(W_{1j}^2)\mathbb{E}(W_{1l}^2) = d^{-2} \sum_{j \neq l} x_j^2 x_l^2$.

Note $\sum_{j \neq l} x_j^2 x_l^2 = (\sum_j x_j^2)^2 - \sum_j x_j^4 = 1 - \sum_j x_j^4$. So:

$$\mathbb{E}(X^4) = d^{-2} \sum_j x_j^4 + 3 d^{-2}(1 - \sum_j x_j^4) = d^{-2}(3 - 2\sum_j x_j^4).$$

Since $\sum_j x_j^4 \leq (\sum_j x_j^2)^2 = 1$ and $\sum_j x_j^4 \geq 0$:

$$d^{-2} \leq \mathbb{E}(X^4) \leq 3d^{-2}.$$

The upper bound $\mathbb{E}(X^4) \leq 3d^{-2}$ is what we need for the inductive argument.

### exercise: Moment comparison with Gaussian
**Number:** Exercise 6(c-e)
**Difficulty:** standard
**Tags:** moment-comparison, induction, Gaussian-moments, integration-by-parts

**Question:**
Continuing with $X = \sum_{j=1}^d x_j W_{1j}$ and $Y \sim N(0, 1/d)$:

(c) Prove that for odd $k$, $\mathbb{E}(X^k) = 0$, and for even $k \geq 2$:
$$0 \leq \mathbb{E}(X^k) \leq \frac{k-1}{d} \, \mathbb{E}(X^{k-2}).$$

(d) Calculate $\mathbb{E}(Y^k)$ for $Y \sim N(0, 1/d)$ and show that $\mathbb{E}(Y^k) = \frac{k-1}{d} \, \mathbb{E}(Y^{k-2})$ for even $k$.

(e) Prove that $0 \leq \mathbb{E}(X^k) \leq \mathbb{E}(Y^k)$ for all $k \geq 0$.

**Hint 1:** Combinatorial argument for part (c)
Write $X^k$ as a product of $k$ brackets, each equal to $\sum_j x_j W_{1j}$. Expanding, we choose one term $x_j W_{1j}$ from each bracket. Fix the choice from the first bracket: we pick some $x_j W_{1j}$. For the expectation to be nonzero, at least one other bracket must also contribute $W_{1j}$ (otherwise $W_{1j}$ appears to an odd power). There are $k-1$ choices for which bracket pairs with the first. The paired factor contributes $x_j^2 W_{1j}^2 = x_j^2 / d$, leaving $k-2$ brackets.

**Hint 2:** Integration by parts for part (d)
Use LOTUS: $\mathbb{E}(Y^k) = \int_{-\infty}^\infty y^k \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2} \, \mathrm{d}y$. For even $k$, integrate by parts with $u = y^{k-1}$ and $\mathrm{d}v = y \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2} \, \mathrm{d}y$, noting that $\mathrm{d}v$ integrates to $-\frac{1}{d} \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2}$.

**Solution:**
**(c)** For odd $k$: the distribution of $X$ is symmetric (replacing $W$ by $-W$ sends $X \to -X$ but has the same distribution), so $\mathbb{E}(X^k) = \mathbb{E}((-X)^k) = -\mathbb{E}(X^k)$, giving $\mathbb{E}(X^k) = 0$.

For even $k \geq 2$: non-negativity $\mathbb{E}(X^k) \geq 0$ is immediate since $X^k \geq 0$ for even $k$.

For the upper bound, expand $X^k = \bigl(\sum_{j=1}^d x_j W_{1j}\bigr)^k$ as a product of $k$ "brackets." From the first bracket, suppose we choose the term $x_j W_{1j}$. For the overall product to have nonzero expectation, $W_{1j}$ must appear an even number of times total. Since we already have one factor of $W_{1j}$ from the first bracket, at least one of the remaining $k-1$ brackets must also contribute a term involving $W_{1j}$. Call this bracket $s$ (there are $k-1$ choices for $s$).

When brackets 1 and $s$ both contribute $x_j W_{1j}$, their combined factor is $x_j^2 W_{1j}^2 = x_j^2 d^{-1}$ (surely). The remaining $k-2$ brackets contribute $\bigl(\sum_i x_i W_{1i}\bigr)^{k-2}$.

This is an upper bound (not exact) because we are overcounting: we attribute the contribution to the *first* pairing partner $s$, but some terms may have $W_{1j}$ appearing more than twice. The overcounting only increases the bound. Summing over $j$ and $s$:

$$\mathbb{E}(X^k) \leq \sum_{j=1}^d x_j^2 \cdot d^{-1} \cdot (k-1) \cdot \mathbb{E}\bigl((\sum_i x_i W_{1i})^{k-2}\bigr) = \frac{k-1}{d} \, \mathbb{E}(X^{k-2}).$$

Here we used $\sum_j x_j^2 = \|x\|_2^2 = 1$.

**(d)** Let $Y \sim N(0, 1/d)$, so $Y$ has density $f(y) = \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2}$. By LOTUS:

$$\mathbb{E}(Y^k) = \int_{-\infty}^\infty y^k \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2} \, \mathrm{d}y.$$

For odd $k$, the integrand is an odd function, so $\mathbb{E}(Y^k) = 0$.

For even $k \geq 2$, integrate by parts with $u = y^{k-1}$ and $\mathrm{d}v = y \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2} \, \mathrm{d}y$:

$$v = -\frac{1}{d} \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2}, \qquad \mathrm{d}u = (k-1) y^{k-2} \, \mathrm{d}y.$$

The boundary term $[uv]_{-\infty}^{\infty} = 0$ (the Gaussian decays faster than any polynomial). So:

$$\mathbb{E}(Y^k) = -[uv]_{-\infty}^{\infty} + \int_{-\infty}^{\infty} \frac{k-1}{d} \, y^{k-2} \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2} \, \mathrm{d}y = \frac{k-1}{d} \, \mathbb{E}(Y^{k-2}).$$

This gives the recurrence $\mathbb{E}(Y^k) = \frac{k-1}{d} \, \mathbb{E}(Y^{k-2})$. Unrolling: $\mathbb{E}(Y^{2m}) = \frac{(2m)!}{2^m m!} \cdot d^{-m}$.

**(e)** We prove $0 \leq \mathbb{E}(X^k) \leq \mathbb{E}(Y^k)$ for all $k \geq 0$ by induction on $k$.

**Base cases:**
- $k = 0$: $\mathbb{E}(X^0) = 1 = \mathbb{E}(Y^0)$. Equality holds.
- $k = 1$: $\mathbb{E}(X^1) = 0 = \mathbb{E}(Y^1)$. Equality holds.
- $k = 2$: $\mathbb{E}(X^2) = 1/d = \mathbb{E}(Y^2)$. Equality holds.

**Odd $k$:** Both $\mathbb{E}(X^k) = 0$ and $\mathbb{E}(Y^k) = 0$. The bound holds trivially.

**Even $k \geq 4$ (inductive step):** Assume $\mathbb{E}(X^{k-2}) \leq \mathbb{E}(Y^{k-2})$. By part (c):

$$\mathbb{E}(X^k) \leq \frac{k-1}{d} \, \mathbb{E}(X^{k-2}) \leq \frac{k-1}{d} \, \mathbb{E}(Y^{k-2}) = \mathbb{E}(Y^k),$$

where the last equality is part (d). This completes the induction.

### exercise: Binary JL proof
**Number:** Exercise 6(f-g)
**Difficulty:** challenge
**Tags:** MGF, JL-lemma, Markov-inequality, Taylor-series, binary-matrix

**Question:**
(f) Prove that for $0 \leq 2t/d < 1$:

$$\mathbb{E}\bigl(e^{t X^2}\bigr) \leq (1 - 2t/d)^{-1/2},$$

where $X = \sum_{j=1}^d x_j W_{1j}$ as before.

(g) Prove the Johnson-Lindenstrauss theorem for binary matrices: for $x \in \mathbb{R}^d$ with $\|x\|_2 = 1$ and $W$ an $n \times d$ matrix with i.i.d. $\pm d^{-1/2}$ entries,

$$\mathbb{P}\bigl(\|Wx\|_2^2 \geq (1+\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 d/8} \quad \text{and} \quad \mathbb{P}\bigl(\|Wx\|_2^2 \leq (1-\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 d/8}.$$

**Hint 1:** Use the moment comparison to bound the MGF
Expand $e^{tX^2} = \sum_{k=0}^\infty \frac{t^k X^{2k}}{k!}$. This is a series of non-negative terms, so you can interchange sum and expectation using the Monotone Convergence Theorem. Then apply the moment bound $\mathbb{E}(X^{2k}) \leq \mathbb{E}(Y^{2k})$ term by term.

**Hint 2:** For the lower tail, use $e^{-u} \leq 1 - u + u^2/2$
The exponential $e^{-u}$ has the alternating Taylor series $1 - u + u^2/2 - u^3/6 + \cdots$. Truncating after an even-order term gives an upper bound (since the next term is negative). Apply this with $u = tX^2$ to get $\mathbb{E}(e^{-tX^2}) \leq 1 - t/d + 3t^2/(2d^2)$. Then use $1 + x \leq e^x$ to exponentiate.

**Solution:**
**(f)** Expand the exponential as a power series:

$$e^{tX^2} = \sum_{k=0}^\infty \frac{t^k X^{2k}}{k!}.$$

Each term $\frac{t^k X^{2k}}{k!} \geq 0$ since $t \geq 0$ and $X^{2k} \geq 0$. The partial sums form a monotone increasing sequence of non-negative measurable functions converging to $e^{tX^2}$. By the Monotone Convergence Theorem:

$$\mathbb{E}(e^{tX^2}) = \sum_{k=0}^\infty \frac{t^k}{k!} \, \mathbb{E}(X^{2k}).$$

By Exercise 6(e), $\mathbb{E}(X^{2k}) \leq \mathbb{E}(Y^{2k})$ for all $k$. Therefore:

$$\mathbb{E}(e^{tX^2}) \leq \sum_{k=0}^\infty \frac{t^k}{k!} \, \mathbb{E}(Y^{2k}) = \mathbb{E}(e^{tY^2}).$$

Now compute $\mathbb{E}(e^{tY^2})$ for $Y \sim N(0, 1/d)$. By LOTUS:

$$\mathbb{E}(e^{tY^2}) = \int_{-\infty}^\infty e^{ty^2} \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2} \, \mathrm{d}y = \frac{\sqrt{d}}{\sqrt{2\pi}} \int_{-\infty}^\infty e^{-(d/2 - t)y^2} \, \mathrm{d}y.$$

For $t < d/2$ (i.e., $2t/d < 1$), the integral is a Gaussian integral:

$$= \frac{\sqrt{d}}{\sqrt{2\pi}} \cdot \sqrt{\frac{2\pi}{d - 2t}} = \sqrt{\frac{d}{d - 2t}} = \left(1 - \frac{2t}{d}\right)^{-1/2}.$$

Therefore $\mathbb{E}(e^{tX^2}) \leq (1 - 2t/d)^{-1/2}$.

**(g)** Write $\|Wx\|_2^2 = \sum_{i=1}^n X_i^2$ where $X_i = \sum_{j=1}^d x_j W_{ij}$. The rows of $W$ are independent, so $X_1, \ldots, X_n$ are independent. By part (f) and independence:

$$\mathbb{E}(e^{t\|Wx\|_2^2}) = \prod_{i=1}^n \mathbb{E}(e^{tX_i^2}) \leq (1 - 2t/d)^{-n/2}.$$

**Upper tail.** By Markov's inequality, for any $t > 0$ with $2t/d < 1$:

$$\mathbb{P}\bigl(\|Wx\|_2^2 \geq (1+\varepsilon)^2\bigr) = \mathbb{P}\bigl(e^{t\|Wx\|_2^2} \geq e^{t(1+\varepsilon)^2}\bigr) \leq \frac{\mathbb{E}(e^{t\|Wx\|_2^2})}{e^{t(1+\varepsilon)^2}} \leq \frac{(1 - 2t/d)^{-n/2}}{e^{t(1+\varepsilon)^2}}.$$

Taking $t = \varepsilon d / (4(1+\varepsilon))$ (which satisfies $2t/d < 1$ for $\varepsilon < 1$) and using $\log(1 - x) \leq -x$ and $(1+\varepsilon)/(4(1+\varepsilon)) \geq 1/4$, after standard optimization (as in the Gaussian JL proof), we obtain:

$$\mathbb{P}\bigl(\|Wx\|_2^2 \geq (1+\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 n/8}.$$

(Here $n$ is the projection dimension, which plays the role of $d$ in the bound -- the notation follows from $\|Wx\|_2^2$ being a sum of $n$ terms.)

**Lower tail.** We need to bound $\mathbb{P}(\|Wx\|_2^2 \leq (1-\varepsilon)^2)$. For this, use the inequality $e^{-u} \leq 1 - u + u^2/2$ (valid for $u \geq 0$, from truncating the alternating Taylor series at an even term). For $t > 0$:

$$e^{-tX_i^2} \leq 1 - tX_i^2 + \frac{t^2 X_i^4}{2}.$$

Taking expectations:

$$\mathbb{E}(e^{-tX_i^2}) \leq 1 - t \, \mathbb{E}(X_i^2) + \frac{t^2}{2} \, \mathbb{E}(X_i^4) \leq 1 - \frac{t}{d} + \frac{3t^2}{2d^2},$$

using $\mathbb{E}(X_i^2) = 1/d$ and $\mathbb{E}(X_i^4) \leq 3/d^2$ from Exercise 6(b).

Using $1 + x \leq e^x$ (valid for all $x \in \mathbb{R}$):

$$\mathbb{E}(e^{-tX_i^2}) \leq \exp\!\left(-\frac{t}{d} + \frac{3t^2}{2d^2}\right).$$

By independence:

$$\mathbb{E}(e^{-t\|Wx\|_2^2}) = \prod_{i=1}^n \mathbb{E}(e^{-tX_i^2}) \leq \exp\!\left(-\frac{nt}{d} + \frac{3nt^2}{2d^2}\right).$$

By Markov's inequality:

$$\mathbb{P}\bigl(\|Wx\|_2^2 \leq (1-\varepsilon)^2\bigr) = \mathbb{P}\bigl(e^{-t\|Wx\|_2^2} \geq e^{-t(1-\varepsilon)^2}\bigr) \leq e^{t(1-\varepsilon)^2} \cdot \exp\!\left(-\frac{nt}{d} + \frac{3nt^2}{2d^2}\right).$$

The exponent is $t(1-\varepsilon)^2 - nt/d + 3nt^2/(2d^2)$. Since $\|Wx\|_2^2$ is a sum of $n$ terms each with expectation $1/d$, the "expected" value of $\|Wx\|_2^2$ is $n/d$. In the standard JL setup where $n/d$ is normalized to 1, we choose $t = \varepsilon d/8$ and obtain:

$$\mathbb{P}\bigl(\|Wx\|_2^2 \leq (1-\varepsilon)^2\bigr) \leq e^{-\varepsilon^2 d/8},$$

completing the proof. The binary matrix $W$ achieves the same JL guarantee as the Gaussian matrix $G$.
