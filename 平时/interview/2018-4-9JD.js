/*
#include <bits/stdc++.h>
 
using namespace std;
 
const int maxn = 100000 + 5;
int tmp[maxn];
int n;
int main() {
    cin >> n;
    for(int i = 1; i <= n; i++) {
        int k = i;
        for(int j = 2; j * j <= n; j++) {
            int s = 0;
            while(k % j == 0) {
                s++;
                k /= j;
            }
            tmp[j] = max(tmp[j], s);
        }
        if(k > 1) tmp[k] = max(tmp[k], 1);
    }
    long long res = 1;
    for(int i = 1; i <= 100000; i++) {
        for(int j = 0; j < tmp[i]; j++) {
            res = res * i % 987654321;
        }
    }
    cout << res << endl;
    return 0;
}
*/

let n=10,arr = []

for(let i=1;i<=n;i++){
    let k = i
    for(let j=2;j*j<=n;j++){
        let s = 0
        while(k%j==0){
            s++
            k /= j
        }
        arr[]
    }

}