a = int(input())
b = int(input())
c = int(input())

if a == b and b == c:
  print('This is Equilateral Triangle')
elif a == b or a == c or b == c:
  print('This is Isosceles Triangle')
else:
  print('This is Scalene Triangle')