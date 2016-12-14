require 'torch'
image = require 'image' -- load the torch image library.
require 'nn'
torch.setdefaulttensortype('torch.FloatTensor') -- use floats as the default data type.


cmd = torch.CmdLine()
cmd:text()
cmd:text('Input a url')
cmd:option('-url', "", "URL of image")
options = cmd:parse(arg)

url = options.url
-- url = "http://www.cs.virginia.edu/~vicente/images/google_android.jpg"

classes = {'airplane', 'automobile', 'bird', 'cat', 'deer',
           'dog', 'frog', 'horse', 'ship', 'truck'}


base = paths.basename(url)
if not paths.filep(base) then
	os.execute ("wget ".. url)
end


function image_process(img)
 	cifarInfo = torch.load("cifarInfo.t7")
 	cifarMean = cifarInfo.mean
 	cifarStd = cifarInfo.std
 	nch = img:size(1)
 	reshaped_img = torch.Tensor(nch,32,32)
 	for i = 1,nch do
 		reshaped_img[i] = image.scale(img[i], 32, 32)
 		-- reshaped_img[{{}, {i}, {}, {}}]:add(-cifarMean[i])
 		-- reshaped_img[{{}, {i}, {}, {}}]:div(cifarStd[i])
	end
	return reshaped_img
end

function main(img)
	local model = torch.load("CNN-epoch100.t7")
	model:evaluate() -- turn on the evaluation mode

	-- need a testSize
	if img:dim()==3 then 
		img:reshape(1,img:size(1),32,32)
	end

	inputs = img

	local prediction = model:forward(inputs)
	-- print (prediction)
	local _, pos = prediction:max(1)
	local predicted_label = pos[1]
	print(classes[predicted_label])
end


------------------------
------------------------


img = image.load(base)
main(image_process(img))


