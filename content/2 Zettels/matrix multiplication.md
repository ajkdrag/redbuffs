---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/matrix multiplication.md","permalink":"/2-zettels/matrix-multiplication/","PassFrontmatter":true}
---


Topics: [[linear algebra\|linear algebra]] | [[matrices\|matrices]]
Links:

One of the basic operations in linear algebra is matrix multiplication
$$
C_{m\times{p}}=A_{m\times{n}}B_{n\times{p}}
$$
There are multiple ways to interpret mat-mul apart from the rather conventional *dot product of rows of $A$ with columns of $B$*.

## Rows x Columns
The familiar perspective of taking **dot products of rows of $A$ with columns of $B$** to obtain the product $C$. Mathematically, 
$$
c_{ij}=\sum_{k=1}^na_{ik}b_{kj}
$$

## Matrix x Columns
The interpretation here is that, each column of $B$ specifies a **linear combination** of *columns* of $A$, to produce the columns of $C$. So, if we want to rearrange the columns of a matrix, multiply it by another matrix on the **right**.

### Example
Find the transformation matrix that changes the sign of $1^{st}$ column of $A$ and swaps the $2^{nd}$ and $3^{rd}$ columns. (Note $A$ is a $3\times{3}$ matrix, say)
**Answer**: 
$$
B=\begin{bmatrix}-1 & 0 & 0\\0 & 0 & 1\\0 & 1 & 0\end{bmatrix}
$$

## Rows $\times$ Matrix
$AB$ can also be viewed as multiplying each *row* of $A$ by the matrix $B$ on the *right*. Multiplying a row vector by a matrix on the right produces another row vector. Each row of $A$ specifies a linear combination of rows of $B$ to produce rows of $C$. So, if we want to rearrange the rows of a matrix, multiply it by another matrix on the **left**.

### Example
Find the transformation matrix that adds the third row of $B$ to two times the first row and leaves other rows untouched (P.S: similar to steps done during Gaussian Elimination).
**Answer**: 
$$
A=\begin{bmatrix}2 & 0 & 1\\0 & 1 & 0\\0 & 0 & 1\end{bmatrix}
$$

## Columns x Rows
The key to this perspective is to observe: 
- Elements in column $i$ of $A$ only multiply elements in row $j$ of $B$.
- A column times a row vector, sometimes denoted $xy^T$ , is an [[outer product\|outer product]] and produces a **rank-$1$** matrix (as the matrix has one independent vector and others are multiples of it).
So, from this perspective, we could write: 
$$
\begin{align}
AB&=\sum_{k=1}^{3}\text{(column k of A)(row k of B)}\\
&=\sum_{k=1}^3A[:,k]B[k,:]^T
\end{align}
$$

### Example
If
$$
A=\begin{bmatrix}a & b\\c & d\end{bmatrix}
$$ 

and 
$$
B=\begin{bmatrix}e & f\\g & h\end{bmatrix}
$$

We then have:
$$
\begin{align*}
AB&=\begin{bmatrix}ae+bg & af+bh\\ce+dg & cf+dh\end{bmatrix}\\
&=\begin{bmatrix}ae & af\\ce & cf\end{bmatrix}+\begin{bmatrix}bg & bh\\dg & dh\end{bmatrix}\\
&=\begin{bmatrix}a\\c\end{bmatrix}\begin{bmatrix}e & f\end{bmatrix} + \begin{bmatrix}b\\d\end{bmatrix}\begin{bmatrix}g & h\end{bmatrix}\end{align*}
$$

Thus, $AB$ can be written as the sum of the corresponding *column-row* **outer products**.