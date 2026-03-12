---
level: 11
title: "Sub-Gaussian Random Variables & Applications"
status: wip
notes: 3
prerequisites: [10]
---

# Level 11: Sub-Gaussian Random Variables & Applications

## Reading

Level 10 introduced the Chernoff method (Lemma 4): to get exponential tail bounds, apply Markov's inequality to $e^{sX}$ and optimize over $s > 0$. The key input is control of the moment generating function $\mathbb{E}(e^{sX})$. Lemma 3 showed that bounded random variables have well-behaved MGFs. This level extracts the abstract property that makes the Chernoff method work, and then deploys it in one of the most striking applications of probability to geometry: the Johnson-Lindenstrauss lemma.

### Sub-Gaussian random variables

A random variable $X$ is **sub-Gaussian with parameter $\lambda$** if for all $s > 0$:

$$\mathbb{E}(e^{sX}) \leq \exp\bigl(s\,\mathbb{E}(X) + \lambda s^2\bigr).$$

The name comes from comparison with Gaussian random variables. If $Z \sim N(\mu, \sigma^2)$, then $\mathbb{E}(e^{sZ}) = \exp(\mu s + \sigma^2 s^2 / 2)$, so a Gaussian is sub-Gaussian with parameter $\lambda = \sigma^2 / 2$. The sub-Gaussian condition says the MGF grows no faster than a Gaussian's, which means the tails decay at least as fast as Gaussian tails.

Lemma 3 from the previous level tells us that any random variable $X$ taking values in $[a, b]$ is sub-Gaussian with parameter $\lambda = (b-a)^2/8$. This is a powerful statement: bounded random variables have Gaussian-quality tails, not just the polynomial tails you get from Chebyshev's inequality.

The Chernoff method applied to a sub-Gaussian variable gives: for $t > 0$,

$$\mathbb{P}(X - \mathbb{E}(X) \geq t) \leq \exp\!\left(-\frac{t^2}{4\lambda}\right).$$

This follows by optimizing $\mathbb{P}(X - \mathbb{E}(X) \geq t) \leq e^{-st}\,\mathbb{E}(e^{s(X - \mathbb{E}(X))}) \leq e^{-st + \lambda s^2}$ over $s > 0$. Setting $s = t/(2\lambda)$ gives the result. The bound is a genuine Gaussian tail: it decays like $e^{-ct^2}$ rather than polynomially.

### Gaussian random variables: key properties

The Johnson-Lindenstrauss projection uses random matrices with independent Gaussian entries. We need several properties of Gaussian random variables.

Recall that $Z \sim N(0, \sigma^2)$ has density $\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{x^2}{2\sigma^2}\right)$.

**Scaling.** If $Z \sim N(0, 1)$, then $\alpha Z \sim N(0, \alpha^2)$. This is immediate from the change-of-variable formula.

**Addition of independent Gaussians.** If $Z \sim N(0, \alpha^2)$ and $Z' \sim N(0, \beta^2)$ are independent, then $Z + Z' \sim N(0, \alpha^2 + \beta^2)$. One way to prove this is by computing the MGF of the sum: $\mathbb{E}(e^{s(Z + Z')}) = \mathbb{E}(e^{sZ})\,\mathbb{E}(e^{sZ'}) = e^{\alpha^2 s^2/2}\,e^{\beta^2 s^2/2} = e^{(\alpha^2 + \beta^2)s^2/2}$, which is the MGF of $N(0, \alpha^2 + \beta^2)$. (This uses the fact that the distribution of a real random variable is determined by its MGF when the MGF exists in a neighbourhood of 0.)

**General linear combinations.** If $Z_1, \ldots, Z_n$ are independent $N(0, 1)$ random variables and $\alpha_1, \ldots, \alpha_n \in \mathbb{R}$, then

$$Y = \sum_{j=1}^n \alpha_j Z_j \sim N\!\left(0, \sum_{j=1}^n \alpha_j^2\right).$$

This is Exercise 3 below. The proof is a straightforward induction using the addition property above.

### The MGF of a chi-squared variable

Let $Y \sim N(0, 1/d)$. We will need the MGF of $Y^2$. By LOTUS (Theorem 24 from Level 9):

$$\mathbb{E}(e^{tY^2}) = \int_{-\infty}^{\infty} e^{ty^2} \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} \exp\!\left(-\frac{dy^2}{2}\right) \mathrm{d}y = \frac{\sqrt{d}}{\sqrt{2\pi}} \int_{-\infty}^{\infty} \exp\!\left(-\frac{(d - 2t)y^2}{2}\right) \mathrm{d}y.$$

For this integral to converge, we need $d - 2t > 0$, i.e., $2t < d$. When this holds, the integral is a Gaussian integral equal to $\sqrt{2\pi/(d - 2t)}$, so:

$$\mathbb{E}(e^{tY^2}) = \sqrt{\frac{d}{d - 2t}} = \left(1 - \frac{2t}{d}\right)^{-1/2}.$$

This is Exercise 4 below. The formula says the MGF of $Y^2$ blows up as $t \to d/2$, which reflects the heavy right tail of a chi-squared distribution.

### Johnson-Lindenstrauss projection: the single-vector case

We are now ready for the main result. Let $v \in \mathbb{R}^n$ be any fixed vector, and let $A$ be a $d \times n$ random matrix whose entries are independent $N(0, 1/d)$ random variables.

**Theorem 5 (JL Projection).** With probability at least $1 - 2\exp(-\varepsilon^2 d/8)$:

$$(1 - \varepsilon)\|v\|_2 \leq \|Av\|_2 \leq (1 + \varepsilon)\|v\|_2.$$

The proof has three steps.

**Step 1: Reduce to $\|v\|_2 = 1$.** Both sides of the inequality scale linearly in $\|v\|_2$, so we may assume WLOG that $\|v\|_2 = 1$.

**Step 2: Identify the distribution.** The $i$-th entry of $Av$ is $Y_i = \sum_{j=1}^n A_{ij} v_j$, where $A_{ij} \sim N(0, 1/d)$ independently. By Exercise 3, since $\sum_j v_j^2 = \|v\|_2^2 = 1$, we have $Y_i \sim N(0, 1/d)$. The $Y_i$ for different $i$ are independent because they depend on different rows of $A$. Therefore:

$$\|Av\|_2^2 = Y_1^2 + Y_2^2 + \cdots + Y_d^2,$$

where $Y_1, \ldots, Y_d$ are i.i.d. $N(0, 1/d)$. The expectation is $\mathbb{E}(\|Av\|_2^2) = d \cdot (1/d) = 1 = \|v\|_2^2$. So $\|Av\|_2^2$ is an unbiased estimator of $\|v\|_2^2$. The concentration question is: how tightly does $\|Av\|_2^2$ concentrate around its mean?

**Step 3a: Upper tail.** We want to bound $\mathbb{P}(\|Av\|_2^2 > (1 + \varepsilon)^2)$. By the Chernoff method with parameter $t > 0$:

$$\mathbb{P}\!\left(\sum_{i=1}^d Y_i^2 > (1+\varepsilon)^2\right) \leq \frac{\mathbb{E}\!\left(e^{t \sum Y_i^2}\right)}{e^{t(1+\varepsilon)^2}}.$$

Since the $Y_i$ are independent, the MGF factors:

$$\mathbb{E}\!\left(e^{t \sum Y_i^2}\right) = \prod_{i=1}^d \mathbb{E}(e^{tY_i^2}) = \left(1 - \frac{2t}{d}\right)^{-d/2},$$

using the chi-squared MGF from Exercise 4. So the bound becomes:

$$\mathbb{P}\!\left(\sum Y_i^2 > (1+\varepsilon)^2\right) \leq \left(1 - \frac{2t}{d}\right)^{-d/2} e^{-t(1+\varepsilon)^2}.$$

Taking logs and optimizing: set $t = \frac{d(2\varepsilon + \varepsilon^2)}{2(1+\varepsilon)^2}$. After calculus (using $\log(1-x) \leq -x$ and the bound $(1+\varepsilon)^2 \geq 1 + 2\varepsilon$), one obtains:

$$\mathbb{P}\!\left(\|Av\|_2^2 > (1+\varepsilon)^2\right) < e^{-\varepsilon^2 d/8}.$$

Taking square roots, $\mathbb{P}(\|Av\|_2 > 1 + \varepsilon) < e^{-\varepsilon^2 d/8}$.

**Step 3b: Lower tail.** We want to bound $\mathbb{P}(\|Av\|_2^2 < (1-\varepsilon)^2)$. The Chernoff method now uses *negative* $t$: for $t > 0$,

$$\mathbb{P}\!\left(\sum Y_i^2 < (1-\varepsilon)^2\right) = \mathbb{P}\!\left(e^{-t\sum Y_i^2} > e^{-t(1-\varepsilon)^2}\right) \leq \frac{\mathbb{E}(e^{-t\sum Y_i^2})}{e^{-t(1-\varepsilon)^2}}.$$

We need to bound $\mathbb{E}(e^{-tY_i^2})$ for $t > 0$. Using the inequality $e^{-x} \leq 1 - x + x^2/2$ (valid for $x \geq 0$), and computing $\mathbb{E}(Y_i^2) = 1/d$, $\mathbb{E}(Y_i^4) = 3/d^2$:

$$\mathbb{E}(e^{-tY_i^2}) \leq 1 - \frac{t}{d} + \frac{t^2}{2}\mathbb{E}(Y_i^4) = 1 - \frac{t}{d} + \frac{3t^2}{2d^2}.$$

Therefore:

$$\mathbb{E}(e^{-t\sum Y_i^2}) = \prod_{i=1}^d \mathbb{E}(e^{-tY_i^2}) \leq \left(1 - \frac{t}{d} + \frac{3t^2}{2d^2}\right)^d.$$

Choosing $t$ appropriately (using $\log(1 + x) \leq x$ and optimizing) yields:

$$\mathbb{P}\!\left(\|Av\|_2^2 < (1-\varepsilon)^2\right) < e^{-\varepsilon^2 d/8}.$$

Combining the upper and lower tail bounds via a union bound:

$$\mathbb{P}\!\left(\|Av\|_2 \notin \bigl[(1-\varepsilon)\|v\|_2,\, (1+\varepsilon)\|v\|_2\bigr]\right) \leq 2e^{-\varepsilon^2 d/8}.$$

### The Johnson-Lindenstrauss Theorem

Theorem 5 controls the distortion of a single vector. To handle a whole point set, we use the union bound.

**Theorem 6 (Johnson-Lindenstrauss Theorem).** Let $0 < \varepsilon \leq 1/2$ and let $S$ be a set of at most $\exp(\varepsilon^2 d / 32)$ points in $\mathbb{R}^n$. Then there exists a $d \times n$ matrix $A$ such that for all $v, v' \in S$:

$$(1 - \varepsilon)\|v - v'\|_2 \leq \|A(v - v')\|_2 \leq (1 + \varepsilon)\|v - v'\|_2.$$

That is, the linear map $x \mapsto Ax$ preserves all pairwise distances in $S$ up to a factor of $(1 \pm \varepsilon)$.

**Proof.** Let $A$ be a random $d \times n$ matrix with i.i.d. $N(0, 1/d)$ entries. For each pair $(v, v') \in S \times S$ with $v \neq v'$, Theorem 5 applied to the vector $v - v'$ gives:

$$\mathbb{P}\!\left(\|A(v-v')\|_2 \notin \bigl[(1-\varepsilon)\|v-v'\|_2,\, (1+\varepsilon)\|v-v'\|_2\bigr]\right) \leq 2e^{-\varepsilon^2 d/8}.$$

There are at most $\binom{|S|}{2} \leq |S|^2/2$ unordered pairs. By the union bound:

$$\mathbb{P}(\text{any pair fails}) \leq |S|^2 \cdot 2e^{-\varepsilon^2 d/8}.$$

Since $|S| \leq \exp(\varepsilon^2 d/32)$, we have $|S|^2 \leq \exp(\varepsilon^2 d/16)$, so:

$$\mathbb{P}(\text{any pair fails}) \leq 2\exp\!\left(-\frac{\varepsilon^2 d}{16}\right) < 1.$$

Since the failure probability is strictly less than 1, there exists at least one realization of $A$ for which all pairs satisfy the distance-preservation condition. $\square$

### Application to data science

Theorem 6 has a remarkable consequence for high-dimensional data. Rearranging the constraint $|S| \leq \exp(\varepsilon^2 d/32)$ gives:

$$d \geq \frac{32 \log |S|}{\varepsilon^2}.$$

So any set of $|S|$ points in $\mathbb{R}^n$ (no matter how large $n$ is) can be projected to $\mathbb{R}^d$ with $d = O(\varepsilon^{-2} \log |S|)$ while preserving all pairwise distances up to a factor of $(1 \pm \varepsilon)$.

This is striking: the target dimension depends only on the *number of points* and the *accuracy*, not on the original ambient dimension $n$. A dataset of 1 million points in $\mathbb{R}^{10000}$ can be projected to $\mathbb{R}^d$ with $d \approx 32 \cdot \ln(10^6)/\varepsilon^2 \approx 443/\varepsilon^2$ while approximately preserving all pairwise distances. For $\varepsilon = 0.1$ this gives $d \approx 44300$, but for $\varepsilon = 0.5$ it gives $d \approx 1773$ -- a significant reduction.

In practice, this is used in machine learning to reduce the dimensionality of feature vectors before running algorithms whose complexity depends on dimension (e.g., nearest-neighbour search). The projection is "data-oblivious" -- the random matrix $A$ does not depend on the data points, only on the desired accuracy and the number of points.

## Key Results

### theorem: JL Projection (single vector)
**Number:** Theorem 5
**Plain English:** Multiplying a vector by a random Gaussian matrix approximately preserves its norm. The probability of significant distortion decays exponentially in the projection dimension $d$.
**Formal:** Let $v \in \mathbb{R}^n$ and let $A$ be a $d \times n$ matrix with i.i.d. $N(0, 1/d)$ entries. Then for any $\varepsilon > 0$:
$$\mathbb{P}\!\left(\|Av\|_2 \notin \bigl[(1-\varepsilon)\|v\|_2,\, (1+\varepsilon)\|v\|_2\bigr]\right) \leq 2\exp\!\left(-\frac{\varepsilon^2 d}{8}\right).$$
**Proof sketch:**
1. WLOG $\|v\|_2 = 1$. Then $\|Av\|_2^2 = \sum_{i=1}^d Y_i^2$ with $Y_i \sim N(0, 1/d)$ i.i.d.
2. Upper tail: Chernoff method with the chi-squared MGF $(1 - 2t/d)^{-d/2}$; optimize $t$ to get $e^{-\varepsilon^2 d/8}$.
3. Lower tail: Chernoff method with negative exponent; bound $\mathbb{E}(e^{-tY_i^2})$ using $e^{-x} \leq 1 - x + x^2/2$; optimize to get $e^{-\varepsilon^2 d/8}$.
4. Union bound over upper and lower tails.
**Key technique:** Chernoff method, chi-squared MGF, union bound
**Load-bearing:** yes

### theorem: Johnson-Lindenstrauss Theorem
**Number:** Theorem 6
**Plain English:** Any finite point set in high dimensions can be embedded into $O(\varepsilon^{-2} \log |S|)$ dimensions while preserving all pairwise distances up to a factor of $(1 \pm \varepsilon)$. The target dimension depends only on the number of points and the desired accuracy, not on the ambient dimension.
**Formal:** Let $0 < \varepsilon \leq 1/2$ and let $S$ be a set of at most $\exp(\varepsilon^2 d/32)$ points in $\mathbb{R}^n$. There exists a $d \times n$ matrix $A$ such that for all $v, v' \in S$:
$$(1 - \varepsilon)\|v - v'\|_2 \leq \|A(v - v')\|_2 \leq (1 + \varepsilon)\|v - v'\|_2.$$
**Proof sketch:**
1. Draw $A$ randomly with i.i.d. $N(0, 1/d)$ entries.
2. Apply Theorem 5 to each difference $v - v'$: each pair fails with probability $\leq 2e^{-\varepsilon^2 d/8}$.
3. Union bound over $\leq |S|^2$ pairs: total failure probability $\leq 2|S|^2 e^{-\varepsilon^2 d/8} \leq 2e^{-\varepsilon^2 d/16} < 1$.
4. Since failure probability $< 1$, a good matrix exists (probabilistic method).
**Key technique:** Theorem 5 + union bound + probabilistic method
**Load-bearing:** yes

## Exercises

### exercise: Sum of independent Gaussians is Gaussian
**Number:** Exercise 3
**Difficulty:** warm-up
**Tags:** Gaussian, MGF, independence, linear-combination

**Question:**
Let $Z_1, \ldots, Z_n$ be independent $N(0, 1)$ random variables and let $\alpha_1, \ldots, \alpha_n \in \mathbb{R}$. Prove that

$$Y = \sum_{j=1}^n \alpha_j Z_j \sim N\!\left(0, \sum_{j=1}^n \alpha_j^2\right).$$

*Hint: compute the MGF of $Y$ using independence, and identify the result as the MGF of the claimed Gaussian.*

**Hint 1:** Compute the MGF of each summand
Recall that if $Z \sim N(0, 1)$, then $\mathbb{E}(e^{sZ}) = e^{s^2/2}$. Therefore $\mathbb{E}(e^{s \alpha_j Z_j}) = e^{\alpha_j^2 s^2 / 2}$.

**Hint 2:** Use independence to factor the joint MGF
Since $Z_1, \ldots, Z_n$ are independent, $\mathbb{E}(e^{sY}) = \prod_{j=1}^n \mathbb{E}(e^{s\alpha_j Z_j})$. Multiply the exponentials and compare with the MGF of $N(0, \sigma^2)$, which is $e^{\sigma^2 s^2/2}$.

**Solution:**
We compute the moment generating function of $Y$. For any $s \in \mathbb{R}$:

$$\mathbb{E}(e^{sY}) = \mathbb{E}\!\left(\exp\!\left(s \sum_{j=1}^n \alpha_j Z_j\right)\right) = \mathbb{E}\!\left(\prod_{j=1}^n e^{s\alpha_j Z_j}\right).$$

Since $Z_1, \ldots, Z_n$ are independent, and $e^{s\alpha_j Z_j}$ is a function of $Z_j$ alone, the expectation of the product equals the product of expectations (by multiplicativity of expectation for independent random variables, Theorem 22):

$$\mathbb{E}(e^{sY}) = \prod_{j=1}^n \mathbb{E}(e^{s\alpha_j Z_j}).$$

For each $j$: since $Z_j \sim N(0,1)$, we have $\alpha_j Z_j \sim N(0, \alpha_j^2)$ by the scaling property. The MGF of $N(0, \sigma^2)$ evaluated at $s$ is $\exp(\sigma^2 s^2 / 2)$. Therefore:

$$\mathbb{E}(e^{s\alpha_j Z_j}) = \exp\!\left(\frac{\alpha_j^2 s^2}{2}\right).$$

Multiplying:

$$\mathbb{E}(e^{sY}) = \prod_{j=1}^n \exp\!\left(\frac{\alpha_j^2 s^2}{2}\right) = \exp\!\left(\frac{s^2}{2} \sum_{j=1}^n \alpha_j^2\right).$$

This is exactly the MGF of $N\!\left(0, \sum_{j=1}^n \alpha_j^2\right)$, evaluated at $s$. Since the MGF exists for all $s \in \mathbb{R}$ (it is finite everywhere), and a distribution is uniquely determined by its MGF when the MGF exists in a neighbourhood of $0$, we conclude $Y \sim N\!\left(0, \sum_{j=1}^n \alpha_j^2\right)$. $\square$

### exercise: MGF of a chi-squared variable
**Number:** Exercise 4
**Difficulty:** standard
**Tags:** MGF, chi-squared, LOTUS, Gaussian-integral

**Question:**
Let $Y \sim N(0, 1/d)$. Prove that for $2t < d$:

$$\mathbb{E}(e^{tY^2}) = \left(1 - \frac{2t}{d}\right)^{-1/2}.$$

*Hint: write out the integral using LOTUS and complete the square / change of variable.*

**Hint 1:** Write out the expectation using LOTUS
By LOTUS, $\mathbb{E}(e^{tY^2}) = \int_{-\infty}^{\infty} e^{ty^2} \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} e^{-dy^2/2} \, \mathrm{d}y$. Combine the two exponentials into a single Gaussian integrand.

**Hint 2:** Evaluate the resulting Gaussian integral
After combining, the exponent is $-\frac{(d - 2t)}{2} y^2$. For $d - 2t > 0$, this is a Gaussian integral: $\int_{-\infty}^{\infty} e^{-\alpha y^2 / 2} \, \mathrm{d}y = \sqrt{2\pi/\alpha}$. Substitute $\alpha = d - 2t$ and simplify.

**Solution:**
By LOTUS (Theorem 24), since $Y \sim N(0, 1/d)$ has density $f(y) = \frac{\sqrt{d}}{\sqrt{2\pi}} \exp\!\left(-\frac{dy^2}{2}\right)$:

$$\mathbb{E}(e^{tY^2}) = \int_{-\infty}^{\infty} e^{ty^2} \cdot \frac{\sqrt{d}}{\sqrt{2\pi}} \exp\!\left(-\frac{dy^2}{2}\right) \mathrm{d}y.$$

Combine the exponentials:

$$= \frac{\sqrt{d}}{\sqrt{2\pi}} \int_{-\infty}^{\infty} \exp\!\left(-\frac{(d - 2t)y^2}{2}\right) \mathrm{d}y.$$

For this integral to converge, we need $d - 2t > 0$, i.e., $2t < d$. Under this condition, set $\alpha = d - 2t > 0$. The standard Gaussian integral formula gives:

$$\int_{-\infty}^{\infty} \exp\!\left(-\frac{\alpha y^2}{2}\right) \mathrm{d}y = \sqrt{\frac{2\pi}{\alpha}}.$$

(This is verified by substituting $u = \sqrt{\alpha}\, y$ to reduce to $\int_{-\infty}^{\infty} e^{-u^2/2} \, \mathrm{d}u = \sqrt{2\pi}$.)

Substituting back:

$$\mathbb{E}(e^{tY^2}) = \frac{\sqrt{d}}{\sqrt{2\pi}} \cdot \sqrt{\frac{2\pi}{d - 2t}} = \sqrt{\frac{d}{d-2t}} = \left(1 - \frac{2t}{d}\right)^{-1/2}.$$

$\square$

### exercise: Lower bound for JL projection
**Number:** Exercise 5
**Difficulty:** standard
**Tags:** Chernoff, lower-tail, chi-squared, JL-projection

**Question:**
Let $Y_1, \ldots, Y_d$ be independent $N(0, 1/d)$ random variables. Prove that for $0 < \varepsilon \leq 1/2$:

$$\mathbb{P}\!\left(\sum_{i=1}^d Y_i^2 < (1 - \varepsilon)^2\right) < \exp\!\left(-\frac{\varepsilon^2 d}{8}\right).$$

*Hint: use the Chernoff method with a negative exponent. Bound $\mathbb{E}(e^{-tY_i^2})$ using $e^{-x} \leq 1 - x + x^2/2$ for $x \geq 0$.*

**Hint 1:** Set up the Chernoff bound with a decreasing exponential
For $t > 0$, the function $x \mapsto e^{-tx}$ is decreasing, so $\sum Y_i^2 < c$ implies $e^{-t\sum Y_i^2} > e^{-tc}$. Apply Markov's inequality to $e^{-t\sum Y_i^2}$.

**Hint 2:** Bound the MGF using moments
Use $e^{-x} \leq 1 - x + x^2/2$ with $x = tY_i^2$:
$$\mathbb{E}(e^{-tY_i^2}) \leq 1 - t\,\mathbb{E}(Y_i^2) + \frac{t^2}{2}\mathbb{E}(Y_i^4) = 1 - \frac{t}{d} + \frac{3t^2}{2d^2}.$$
Here $\mathbb{E}(Y_i^2) = 1/d$ and $\mathbb{E}(Y_i^4) = 3/d^2$ (the fourth moment of $N(0, 1/d)$). Then use $1 + x \leq e^x$ to pass from a product to an exponential.

**Solution:**
**Step 1: Chernoff setup.** For any $t > 0$, since $e^{-tx}$ is a decreasing function of $x$:

$$\mathbb{P}\!\left(\sum_{i=1}^d Y_i^2 < (1-\varepsilon)^2\right) = \mathbb{P}\!\left(e^{-t\sum Y_i^2} > e^{-t(1-\varepsilon)^2}\right) \leq \frac{\mathbb{E}(e^{-t\sum Y_i^2})}{e^{-t(1-\varepsilon)^2}},$$

by Markov's inequality applied to the non-negative random variable $e^{-t\sum Y_i^2}$.

**Step 2: Factor using independence.**

$$\mathbb{E}(e^{-t\sum Y_i^2}) = \prod_{i=1}^d \mathbb{E}(e^{-tY_i^2}).$$

**Step 3: Bound each factor.** For $x \geq 0$, the inequality $e^{-x} \leq 1 - x + \frac{x^2}{2}$ holds (this follows from the Taylor expansion of $e^{-x}$: the alternating series $\sum (-1)^k x^k/k!$ satisfies $e^{-x} \leq$ any partial sum ending with a positive term). Applying this with $x = tY_i^2 \geq 0$ and taking expectations:

$$\mathbb{E}(e^{-tY_i^2}) \leq 1 - t\,\mathbb{E}(Y_i^2) + \frac{t^2}{2}\,\mathbb{E}(Y_i^4).$$

Since $Y_i \sim N(0, 1/d)$:
- $\mathbb{E}(Y_i^2) = \operatorname{Var}(Y_i) = 1/d$.
- $\mathbb{E}(Y_i^4) = 3(\operatorname{Var}(Y_i))^2 = 3/d^2$ (the fourth moment of $N(0, \sigma^2)$ is $3\sigma^4$).

So:

$$\mathbb{E}(e^{-tY_i^2}) \leq 1 - \frac{t}{d} + \frac{3t^2}{2d^2}.$$

**Step 4: Bound the product.** Using $1 + x \leq e^x$ for all $x \in \mathbb{R}$:

$$\prod_{i=1}^d \mathbb{E}(e^{-tY_i^2}) \leq \left(1 - \frac{t}{d} + \frac{3t^2}{2d^2}\right)^d \leq \exp\!\left(d\!\left(-\frac{t}{d} + \frac{3t^2}{2d^2}\right)\right) = \exp\!\left(-t + \frac{3t^2}{2d}\right).$$

**Step 5: Combine and optimize.** The Chernoff bound gives:

$$\mathbb{P}\!\left(\sum Y_i^2 < (1-\varepsilon)^2\right) \leq \exp\!\left(-t + \frac{3t^2}{2d} + t(1-\varepsilon)^2\right) = \exp\!\left(-t(2\varepsilon - \varepsilon^2) + \frac{3t^2}{2d}\right),$$

where we used $-t + t(1-\varepsilon)^2 = -t(2\varepsilon - \varepsilon^2)$.

Choose $t = \frac{d(2\varepsilon - \varepsilon^2)}{3}$ to minimize the exponent. Substituting:

$$\text{exponent} = -\frac{d(2\varepsilon - \varepsilon^2)^2}{3} + \frac{3}{2d} \cdot \frac{d^2(2\varepsilon - \varepsilon^2)^2}{9} = -\frac{d(2\varepsilon - \varepsilon^2)^2}{3} + \frac{d(2\varepsilon - \varepsilon^2)^2}{6} = -\frac{d(2\varepsilon - \varepsilon^2)^2}{6}.$$

For $0 < \varepsilon \leq 1/2$, we have $2\varepsilon - \varepsilon^2 = \varepsilon(2 - \varepsilon) \geq \varepsilon \cdot \frac{3}{2}$, so $(2\varepsilon - \varepsilon^2)^2 \geq \frac{9\varepsilon^2}{4}$. But we can use the simpler bound $2\varepsilon - \varepsilon^2 \geq \varepsilon$ (since $\varepsilon \leq 1$), giving $(2\varepsilon - \varepsilon^2)^2 \geq \varepsilon^2$. Actually, for a tighter analysis: since $\varepsilon \leq 1/2$, we have $2\varepsilon - \varepsilon^2 \geq 2\varepsilon - \varepsilon/2 = 3\varepsilon/2$, so:

$$(2\varepsilon - \varepsilon^2)^2 \geq \frac{9\varepsilon^2}{4}.$$

Therefore:

$$\text{exponent} \leq -\frac{d \cdot 9\varepsilon^2/4}{6} = -\frac{3\varepsilon^2 d}{8}.$$

This gives $\mathbb{P}(\sum Y_i^2 < (1-\varepsilon)^2) \leq e^{-3\varepsilon^2 d/8} < e^{-\varepsilon^2 d/8}$, as required. $\square$
