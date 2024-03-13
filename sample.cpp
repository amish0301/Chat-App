#include <bits/stdc++.h>
using namespace std;

vector<int> extractDigits(vector<int> &arr, int n)
{
    while (n > 0)
    {
        arr.push_back(n % 10);
        n = n / 10;
    }

    reverse(arr.begin(), arr.end());
    return arr;
}

bool check(vector<int> &digits)
{
    for (int i = 0; i < digits.size() - 1; i++)
    {
        if (digits[i] == digits[i + 1])
        {
            return true;
        }
    }

    return false;
}

void recursive(int num, unordered_map<int, int> &mp, vector<int> &digits, int cnt)
{
    while (true)
    {
        vector<int> tmp;
        int curr = num;
        tmp = extractDigits(tmp, curr);
        digits.insert(digits.end(), tmp.begin(), tmp.end());

        int sz = digits.size();
        for (int i = 0; i < sz; i++)
        {
            if (check(digits))
            {
                cout << cnt << endl;
                break;
            }
            
            int factor = digits[i] * num;
            if (mp.count(factor))
                continue;
            mp[factor]++;
            // num = factor;
            recursive(factor, mp, digits, cnt + 1);
        }
    }
}

int main()
{
    int num = 134;
    unordered_map<int, int> mp;
    vector<int> digits;
    int cnt = 0;

    recursive(num, mp, digits, cnt);
    return 0;
}