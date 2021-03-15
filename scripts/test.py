

snake = '0'
nos = '0**'



# for x in range(1,10):
# 	if x == 1:
# 		print(nos)
# 		continue
# 	print(snake*x)


for q in range(1,10):
	for x in range(1,10):
		if x == q:
			print(nos)
			continue
		print(snake*x)

