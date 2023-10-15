package CheikhAbdoulayeFayeCSCI331Proj2;

public class Main {
    static int index;
    
    public static void main(String[] args) {
        /*
        BounderBuffer_V1 Thread1 = new BounderBuffer_V1(15);
        int nextProduceIndex = Thread1.produce();
        int nextConsumeIndex = Thread1.getConsumeStartTime();
        Thread1.print();
        System.out.println("Next produce in: " + nextProduceIndex);
        System.out.println("Next consume: " + nextConsumeIndex);
        
        for (index = 0; index < 30; index ++){
            System.out.println();
            System.out.println("time " + (index));
            
            if(index == nextProduceIndex){
                nextProduceIndex = Thread1.produce();
                Thread1.print();
                System.out.println("Next produce in: " + nextProduceIndex + " at time " + (index + nextProduceIndex));
                nextProduceIndex += index;
            }
            
            if (index == nextConsumeIndex){
                System.out.println("Consume");
                Thread1.consume();
                Thread1.print();
                nextConsumeIndex = Thread1.getConsumeStartTime();
                System.out.println("Next consume in: " + nextConsumeIndex + " at time " + (index + nextConsumeIndex));
                nextConsumeIndex += index;
            }
        }
        Thread1.print();
        */
        
        BounderBuffer_V2 Thread2 = new BounderBuffer_V2(10);
        int option = 0;
        
        int nextProduceIndex = Thread2.produce();
        int nextConsumeIndex = Thread2.getConsumeStartTime();
        Thread2.print();
        System.out.println("Next produce in: " + nextProduceIndex);
        System.out.println("Next consume: " + nextConsumeIndex);
        for (index = 0; index < 30; index ++){
            System.out.println();
            System.out.println("time " + (index));
            
            if(index == nextProduceIndex){
                nextProduceIndex = Thread2.produce();
                Thread2.print();
                System.out.println("Next produce in: " + nextProduceIndex + " at time " + (index + nextProduceIndex));
                nextProduceIndex += index;
                option = Thread2.cosumerSignal();
                if (option != 0){
                System.out.println("Consumer signal update:");
                Thread2.print();
                }
                option = 0;
            }
            
            if (index == nextConsumeIndex){
                System.out.println("Consume");
                Thread2.consume();
                Thread2.print();
                nextConsumeIndex = Thread2.getConsumeStartTime();
                System.out.println("Next consume in: " + nextConsumeIndex + " at time " + (index + nextConsumeIndex));
                nextConsumeIndex += index;
                option = Thread2.producerSignal();
                if (option != 0){
                System.out.println("Producer signal update:");
                Thread2.print();
                }
                option = 0;
            }
        }
    }
}